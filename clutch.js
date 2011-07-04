var http = require('http');
var clutch = require('clutch');

var controller = {
  get: function(req, res, id) {
    res.writeHead(200, {});
    res.end("Got product id " + id);
  }
};

var names = ["products", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "twenty"]

var routeList = []

for(var i = 0; i < names.length; i++) {
  routeList.push(["GET /" + names[i] + "/([A-Za-z0-9]+)$", controller.get]);
}

var urls = clutch.route404(routeList);

http.createServer(urls).listen(2048);