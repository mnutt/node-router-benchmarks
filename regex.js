var http = require('http');
var harness = require('./harness');

var controller = {
  get: function(req, res, id) {
    res.writeHead(200, {});
    res.end("Got product id " + id);
  }
};

var server = http.createServer(function(request, response) {
  var params;

  if(params = request.url.match(/^\/products\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/a\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/b\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/c\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/d\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/e\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/f\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/g\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/h\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/i\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/j\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/k\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/l\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/m\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/n\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/o\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/p\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/q\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/r\/(.+)$/)) {
    controller.get(request, response, params[1]);
  } else if(params = request.url.match(/^\/twenty\/(.+)$/)) {
    controller.get(request, response, params[1]);
  }
}).listen(harness.port);
