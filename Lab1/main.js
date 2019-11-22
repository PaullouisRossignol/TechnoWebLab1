// Import modules
var http = require('http');
//import our own module
const Handle = require('./handle')

const server = http.createServer(Handle.serverHandle);
server.listen(8080);

