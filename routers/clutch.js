var http = require('http');
var clutch = require('clutch');
var harness = require('../harness');

var routeList = [];

harness.addRoutes(function(name, handler) {
  routeList.push(["GET /" + name + "/([A-Za-z0-9]+)$", handler]);
});

var urls = clutch.route404(routeList);

http.createServer(urls).listen(harness.port);
