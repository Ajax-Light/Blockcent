// Fabric Gateway Client
//const gateway = require('./gateway');

// Express
const server = require('./api/server');

// Init Blockchain connection
//gateway.start();
console.log("Connection to Fabric Gateway established");

// Start Express Server
//console.log("Start express server");
server.start();

// Graceful shutdown
server.stop();
//gateway.stop();
console.log("Express server shutdown");