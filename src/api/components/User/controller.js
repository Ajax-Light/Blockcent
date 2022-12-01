/** User Controller */
// Call business Logic (services) 

const conn = require('../../../gateway');

exports.view = async function(userid) {
    return await conn.readAssetByID(userid);
}