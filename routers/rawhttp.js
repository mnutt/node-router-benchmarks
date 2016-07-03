var http = require('http');
var harness = require('../harness');

var server = http.createServer(harness.makeHandler('default')).listen(harness.port);
