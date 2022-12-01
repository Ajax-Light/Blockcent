'use strict';

const grpc = require('@grpc/grpc-js');
const { connect, Contract, Identity, Signer, signers } = require('@hyperledger/fabric-gateway');

const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const util = require('util');

class Gateway {

    client = null;
    gateway = null;
    contract = null;

    constructor() {
        this.channelName = this.envOrDefault('CHANNEL_NAME', 'test');
        this.chaincodeName = this.envOrDefault('CHAINCODE_NAME', 'blockcent');
        this.mspId = this.envOrDefault('MSP_ID', 'Org1MSP');

        // Path to crypto materials.
        this.cryptoPath = this.envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com'));

        // Path to user private key directory.
        this.keyDirectoryPath = this.envOrDefault('KEY_DIRECTORY_PATH', path.resolve(this.cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'keystore'));

        // Path to user certificate.
        this.certPath = this.envOrDefault('CERT_PATH', path.resolve(this.cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'signcerts', 'cert.pem'));

        // Path to peer tls certificate.
        this.tlsCertPath = this.envOrDefault('TLS_CERT_PATH', path.resolve(this.cryptoPath, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt'));

        // Gateway peer endpoint.
        this.peerEndpoint = this.envOrDefault('PEER_ENDPOINT', 'localhost:7051');

        // Gateway peer SSL host name override.
        this.peerHostAlias = this.envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');

        this.utf8Decoder = new util.TextDecoder();
        this.assetId = `PES2UG19CS191`;
    }

    async newGrpcConnection() {
        const tlsRootCert = await fs.readFile(this.tlsCertPath);
        const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
        return new grpc.Client(this.peerEndpoint, tlsCredentials, {
            'grpc.ssl_target_name_override': this.peerHostAlias,
        });
    }

    async newIdentity() {
        const credentials = await fs.readFile(this.certPath);
        return { mspId: this.mspId, credentials };
    }

    async newSigner() {
        const files = await fs.readdir(this.keyDirectoryPath);
        const keyPath = path.resolve(this.keyDirectoryPath, files[0]);
        const privateKeyPem = await fs.readFile(keyPath);
        const privateKey = crypto.createPrivateKey(privateKeyPem);
        return signers.newPrivateKeySigner(privateKey);
    }

    async connect() {

        console.log('******** Connecting with following parameters:\n');
        await this.displayInputParameters();

        // The gRPC client connection should be shared by all Gateway connections to this endpoint.
        const client = await this.newGrpcConnection();
        this.client = client;

        try {
            const gateway = connect({
                client,
                identity: await this.newIdentity(),
                signer: await this.newSigner(),
                // Default timeouts for different gRPC calls
                evaluateOptions: () => {
                    return { deadline: Date.now() + 5000 }; // 5 seconds
                },
                endorseOptions: () => {
                    return { deadline: Date.now() + 15000 }; // 15 seconds
                },
                submitOptions: () => {
                    return { deadline: Date.now() + 5000 }; // 5 seconds
                },
                commitStatusOptions: () => {
                    return { deadline: Date.now() + 60000 }; // 1 minute
                },
            });
            this.gateway = gateway;

            // Get a network instance representing the channel where the smart contract is deployed.
            const network = gateway.getNetwork(this.channelName);

            // Get the smart contract from the network.
            const contract = network.getContract(this.chaincodeName);
            this.contract = contract;

            this.initLedger();
        } catch (error) {
            console.error('******** FAILED to connect to Fabric Gateway', error);
            process.exitCode = 1;
        }
    
    }

    async disconnect() {
        this.gateway.close();
        this.client.close();
    }

    getContract() {
        return this.contract;
    }

    /**
     * This type of transaction would typically only be run once by an application the first time it was started after its
     * initial deployment. A new version of the chaincode deployed later would likely not need to run an "init" function.
     */
    async initLedger() {
        console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');

        await this.contract.submitTransaction('InitLedger');

        console.log('*** Transaction committed successfully');
    }

    /**
     * Evaluate a transaction to query ledger state.
     */
    async getAllAssets() {
        console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');

        const resultBytes = await this.contract.evaluateTransaction('GetAllAssets');

        const resultJson = this.utf8Decoder.decode(resultBytes);
        const result = JSON.parse(resultJson);
        console.log('*** Result:', result);
        return result;
    }

    /**
     * Submit a transaction synchronously, blocking until it has been committed to the ledger.
     */
    async createAsset(obj) {
        console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID, Name, Owns and Points arguments');

        try {
            await this.contract.submitTransaction(
                'CreateAsset',
                obj.id,
                obj.type,
                obj.name,
                JSON.stringify(obj.owns),
                obj.points
            );
        } catch (error) {
            console.error('*** Asset Creation Error. Params:\n');
            console.error(`${obj.id}, ${obj.type}, ${obj.name}, ${obj.owns}, ${obj.points}`);
            console.error('*** Asset may already exist\n');
            return false;
        }
        
        console.log('*** Transaction committed successfully');
        return true;
    }

    /**
     * Submit transaction asynchronously, allowing the application to process the smart contract response (e.g. update a UI)
     * while waiting for the commit notification.
     */
    async transferAssetAsync(fromId, toId, points) {
        console.log(`\n--> Async Submit Transaction:\n From: ${fromId} To: ${toId} Value: ${points}`);

        try {
            const commit = await this.contract.submitAsync('TransferAsset', {
                arguments: [fromId, toId, points],
            });

            const fromString = this.utf8Decoder.decode(commit.getResult());
            const from = JSON.parse(fromString);
        } catch (error) {
            console.error(`Transfer of ${points} points from ${fromId} to ${toId} failed due to Insufficient funds.`);
            return false;
        }
        
        console.log(`*** Successfully submitted transaction to transfer ${points} points from ${fromId} to ${toId}`);
        console.log('*** Waiting for transaction commit');

        console.log('*** Transaction committed successfully');
        return true;
    }

    async readAssetByID(assetId) {
        console.log('\n--> Evaluate Transaction: ReadAsset, function returns asset attributes');

        let resultBytes;
        try {
            resultBytes = await this.contract.evaluateTransaction('ReadAsset', assetId);
        } catch (error){
            console.error(`*** Asset ${assetId} does not exist`);
            return null;
        }

        const resultJson = this.utf8Decoder.decode(resultBytes);
        const result = JSON.parse(resultJson);
        console.log(`*** Reading Asset ${assetId}:\n`, result);
        return result;
    }

    /**
     * submitTransaction() will throw an error containing details of any error responses from the smart contract.
     */
    async updateNonExistentAsset(assetId) {
        console.log('\n--> Submit Transaction: UpdateAsset 000000, 000000 does not exist and should return an error');

        try {
            await this.contract.submitTransaction(
                'UpdateAsset',
                '000000',
                'Student',
                'AppTestError',
                '{"sandwich":0, "tea":0}',
                '0000'
            );
            console.log('******** FAILED to return an error');
        } catch (error) {
            console.log('*** Successfully caught the error: \n', error);
        }
    }

    /**
     * envOrDefault() will return the value of an environment variable, or a default value if the variable is undefined.
     */
    envOrDefault(key, defaultValue) {
        return process.env[key] || defaultValue;
    }

    /**
     * displayInputParameters() will print the global scope parameters used by the main driver routine.
     */
    async displayInputParameters() {
        console.log(`channelName:       ${this.channelName}`);
        console.log(`chaincodeName:     ${this.chaincodeName}`);
        console.log(`mspId:             ${this.mspId}`);
        console.log(`cryptoPath:        ${this.cryptoPath}`);
        console.log(`keyDirectoryPath:  ${this.keyDirectoryPath}`);
        console.log(`certPath:          ${this.certPath}`);
        console.log(`tlsCertPath:       ${this.tlsCertPath}`);
        console.log(`peerEndpoint:      ${this.peerEndpoint}`);
        console.log(`peerHostAlias:     ${this.peerHostAlias}`);
    }
}

const g = new Gateway();
module.exports = g;