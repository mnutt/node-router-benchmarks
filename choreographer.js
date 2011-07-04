var http = require('http');

router = require('choreographer').router();

var controller = {
  get: function(req, res, id) {
    res.writeHead(200, {});
    res.end("Got product id " + id);
  }
};

var names = ["products", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "twenty"];

for(var i = 0; i < names.length; i++) {
  router.get('/' + names[i] + '/*', controller.get);
}

http.createServer(router).listen(2048);
