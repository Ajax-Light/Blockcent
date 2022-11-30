/*
    Import component routes, middleware, error handling, etc.
*/

const express = require('express');
const routes = require('./routes');

const app = express();
const port = 8090;

function init_component_routes(){
    app.use('/api/users', routes.user);
}

function start(){
    init_component_routes();

    app.listen(port, () => {
        console.log(`Express Server Listening on ${port}`);
    })
}

function stop(){
    console.log('Express Server stopped');
}

module.exports = { start, stop }