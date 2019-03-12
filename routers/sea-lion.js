var http = require('http');
var SeaLion = require('sea-lion');
var harness = require('../harness');

var router = new SeaLion();
var routes = {};

harness.addRoutes(function(name, handler) {
    var route = '/' + name + '/`id`';
    routes[route] = handler;
});

router.add(routes);

var server = http.createServer(router.createHandler());

server.listen(harness.port);
