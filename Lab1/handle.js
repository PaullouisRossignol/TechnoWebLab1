var http = require('http');
const url = require('url');
const qs = require('querystring');


const serverHandle = function (req, res) {

  // Retrieve and print the current path
  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)
  var content = '';
  if (path === '/index' && 'name' in params ) {
      if(params['name'] === 'PL') {
          content = 'Hello PL, You are our favorite user !';
      }
      else
          content = 'Hello ' + params['name'];
  }
  else {
      content = 'Hello anonymous';
  }
  if( !('name' in params) )
  {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Error 404, attended URL example: "http://localhost:8080/index?name=yourname" ');
  }
  else
  {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
  }
  res.end();
}
  const anotherFunction = function(){
    return true;
  }
module.exports = {
      serverHandle : serverHandle,
      anotherFunction : anotherFunction
}