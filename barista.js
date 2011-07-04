var Router = require('barista').Router;
var http = require('http');
var router = new Router;

var controller = {
  'products.show': function(req, res, params) {
    res.writeHead(200, {});
    res.end("Got product id " + params.id);
  }
};

var names = ["products", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "twenty"];

for(var i = 0; i < names.length; i++) {
  router.get('/' + names[i] + '/:id').to('products.show');
}

http.createServer(function(req, res) {
  var params = router.first(req.url, req.method);
  controller[params.controller + '.' + params.action](req, res, params);
}).listen(2048);
