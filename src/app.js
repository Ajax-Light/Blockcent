const server = require('./api/server')

// Init Blockchain connection
// TODO
console.log("Connection to Fabric Gateway established")

// Start Express Server
console.log("Start express server")
server.start()

// Graceful shutdown
console.log("Express server shutdown, Gateway connection closed")