/*
    Register all component and middleware routes
*/

const user = require('./components/User/routes.js')

const product = require('./components/Product/routes.js')

module.exports = { user, product }