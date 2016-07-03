var express = require('express');
var harness = require('./harness');

var app = express();

harness.addRoutes(function(name, handler) {
  app.get('/' + name + '/:id', handler);
});

app.listen(harness.port);
