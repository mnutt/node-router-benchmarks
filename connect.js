var connect = require('connect');

var controller = {
  get: function(req, res) {
    res.writeHead(200, {});
    res.end("Got product id " + req.params.id);
  }
};

var names = ["products", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "twenty"]

var routes = connect.router(function(app) {
  for(var i = 0; i < names.length; i++) {
    app.get('/' + names[i] + '/:id', controller.get);
  }
});

connect.createServer(routes).listen(2048);
