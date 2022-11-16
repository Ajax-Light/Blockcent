'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ID: 'PES2UG19CS197',
                Type: 'Student',
                Name: 'Ujwal Kundur',
                Owns: {
                    sandwich: 2,
                    tea: 1,
                    amazon: 0,
                    flipkart: 0,
                    recommendLetter: 0,
                    internship: 0
                },
                Points: 300,
            },
            {
                ID: 'PES2UG19CS191',
                Type: 'Student',
                Name: 'Aashutosh Konge',
                Owns: {
                    sandwich: 1,
                    tea: 0,
                    amazon: 0,
                    flipkart: 1,
                    recommendLetter: 0,
                    internship: 0
                },
                Points: 200,
            },
            {
                ID: 'PES2UG19CS076',
                Type: 'Student',
                Name: 'Atharv Gupta',
                Owns: {
                    sandwich: 0,
                    tea: 2,
                    amazon: 1,
                    flipkart: 0,
                    recommendLetter: 0,
                    internship: 0
                },
                Points: 100,
            },
            {
                ID: 'PES2UG19CS363',
                Type: 'Student',
                Name: 'Sanjana S',
                Owns: {
                    sandwich: 5,
                    tea: 10,
                    amazon: 0,
                    flipkart: 0,
                    recommendLetter: 0,
                    internship: 1
                },
                Points: 50,
            },
            {
                ID: 'PES2UG19CS100',
                Type: 'Student',
                Name: 'Rahul',
                Owns: {
                    sandwich: 1,
                    tea: 1,
                    amazon: 1,
                    flipkart: 1,
                    recommendLetter: 1,
                    internship: 1
                },
                Points: 10,
            },
            {
                ID: 'Canteen1',
                Type: 'Vendor',
                Name: 'PESU Canteen',
                Points: 400,
            }
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, id, type, name, owns, points) {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }

        const asset = {
            ID: id,
            Type: type,
            Name: name,
            Owns: JSON.parse(owns),
            Points: points,
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, id, type, name, owns, points) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ID: id,
            Type: type,
            Name: name,
            Owns: owns,
            Points: points,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, id_from, id_to, points) {
        const existsFrom = await this.AssetExists(ctx, id_from);
        if (!existsFrom) {
            throw new Error(`The asset ${id_from} does not exist`);
        }
        const existsTo = await this.AssetExists(ctx, id_to);
        if (!existsTo) {
            throw new Error(`The asset ${id_to} does not exist`);
        }
        const fromString = await this.ReadAsset(ctx, id_from);
        const toString = await this.ReadAsset(ctx, id_to);
        const from = JSON.parse(fromString);
        const to = JSON.parse(toString);
        if (parseInt(from.Points) - parseInt(points) < 0) {
            throw new Error(`Insufficient points to transfer ${points} from ${id_from} to ${id_to}`);
        }
        to.Points = parseInt(to.Points) + parseInt(points);
        from.Points = parseInt(from.Points) - parseInt(points);
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id_from, Buffer.from(stringify(sortKeysRecursive(from))));
        await ctx.stub.putState(id_to, Buffer.from(stringify(sortKeysRecursive(to))));
        return from;
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;
