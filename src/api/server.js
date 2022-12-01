/*
    Import component routes, middleware, error handling, etc.
*/

const express = require('express');
const body_parser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 8090;

function init_component_routes(){
    app.use('/api/users', routes.user);
}

function start(){
    app.use(body_parser.json());                        // For JSON-Encoded Bodies
    app.use(body_parser.urlencoded({extended:true}));   // For URL-Encoded Bodies

    init_component_routes();

    app.listen(port, () => {
        console.log(`Express Server Listening on ${port}`);
    })
}

function stop(){
    console.log('Express Server stopped');
}

module.exports = { start, stop }