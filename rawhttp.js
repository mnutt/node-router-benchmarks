var http = require('http');

function controller(req, res) {
    res.writeHead(200, {});
    res.end("Got sample product id");
}

var server = http.createServer(controller).listen(2048);
