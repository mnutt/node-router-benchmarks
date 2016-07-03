var http = require('http');
var harness = require('../harness');

var controller = {
  get: function(req, res, name, id) {
    res.writeHead(200, {});
    res.end("Got " + name + " id " + id);
  }
};

var server = http.createServer(function(request, response) {
  var params;

  if(params = request.url.match(/^\/product\/(.+)$/)) {
    controller.get(request, response, 'product', params[1]);
  } else if(params = request.url.match(/^\/a\/(.+)$/)) {
    controller.get(request, response, 'a', params[1]);
  } else if(params = request.url.match(/^\/b\/(.+)$/)) {
    controller.get(request, response, 'b', params[1]);
  } else if(params = request.url.match(/^\/c\/(.+)$/)) {
    controller.get(request, response, 'c', params[1]);
  } else if(params = request.url.match(/^\/d\/(.+)$/)) {
    controller.get(request, response, 'd', params[1]);
  } else if(params = request.url.match(/^\/e\/(.+)$/)) {
    controller.get(request, response, 'e', params[1]);
  } else if(params = request.url.match(/^\/f\/(.+)$/)) {
    controller.get(request, response, 'f', params[1]);
  } else if(params = request.url.match(/^\/g\/(.+)$/)) {
    controller.get(request, response, 'g', params[1]);
  } else if(params = request.url.match(/^\/h\/(.+)$/)) {
    controller.get(request, response, 'h', params[1]);
  } else if(params = request.url.match(/^\/i\/(.+)$/)) {
    controller.get(request, response, 'i', params[1]);
  } else if(params = request.url.match(/^\/j\/(.+)$/)) {
    controller.get(request, response, 'j', params[1]);
  } else if(params = request.url.match(/^\/k\/(.+)$/)) {
    controller.get(request, response, 'k', params[1]);
  } else if(params = request.url.match(/^\/l\/(.+)$/)) {
    controller.get(request, response, 'l', params[1]);
  } else if(params = request.url.match(/^\/m\/(.+)$/)) {
    controller.get(request, response, 'm', params[1]);
  } else if(params = request.url.match(/^\/n\/(.+)$/)) {
    controller.get(request, response, 'n', params[1]);
  } else if(params = request.url.match(/^\/o\/(.+)$/)) {
    controller.get(request, response, 'o', params[1]);
  } else if(params = request.url.match(/^\/p\/(.+)$/)) {
    controller.get(request, response, 'p', params[1]);
  } else if(params = request.url.match(/^\/q\/(.+)$/)) {
    controller.get(request, response, 'q', params[1]);
  } else if(params = request.url.match(/^\/r\/(.+)$/)) {
    controller.get(request, response, 'r', params[1]);
  } else if(params = request.url.match(/^\/twenty\/(.+)$/)) {
    controller.get(request, response, 'twenty', params[1]);
  } else {
    controller.get(request, response, "none");
  }
}).listen(harness.port);
