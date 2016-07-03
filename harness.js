exports.makeHandler = function(handlerName) {
  return function handler(req, res, params) {
    params = req.params || params || { id: '' }; // some routers treat this differently
    res.writeHead(200, {});
    var id = params.id || params;
    res.end("Got " + handlerName + " id " + id);
  };
};

exports.names = ["product", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "twenty"];

exports.addRoutes = function(cb) {
  exports.names.forEach(function(name) {
    cb(name, exports.makeHandler(name));
  });
};

exports.port = 2048;
