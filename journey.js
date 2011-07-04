var journey = require('journey');

var router = new(journey.Router);

var controller = {
  get: function(req, res, id) {
    res.send(200, {}, {response: "Got product id " + id});
  }
};

var names = ["products", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "twenty"]

router.map(function () {
  for(var i = 0; i < names.length; i++) {
    var regex = new RegExp("^\/" + names[i] + "\/(.+)$");
    this.get(regex).bind(controller.get);
  }
});

require('http').createServer(function (request, response) {
  var body = "";

  request.addListener('data', function (chunk) { body += chunk });
  request.addListener('end', function () {
    router.handle(request, body, function (result) {
      response.writeHead(result.status, result.headers);
      response.end(result.body);
    });
  });
}).listen(2048);