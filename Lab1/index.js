  // Import modules
var http = require('http');
const Handle = require('./handle')

 
const server = http.createServer(Handle.serverHandle);
server.listen(8080);

