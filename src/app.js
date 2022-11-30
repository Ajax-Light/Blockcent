// Fabric Gateway Client
const gateway = require('./gateway');

// Express
const server = require('./api/server');

// Init Blockchain connection
gateway.connect();
console.log("Connection to Fabric Gateway established");

// Start Express Server
console.log("Start express server");
server.start();

// Graceful shutdown
/*
server.stop();
gateway.disconnect();
console.log("Express server shutdown");
*/