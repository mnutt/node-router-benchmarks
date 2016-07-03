var router = require('light-router');

var controller = {
  get: function(req, res) {
    res.writeHead(200, {});
    res.end("Got product id " + req.params.id);
  }
};

var names = ["products", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "twenty"]


for(var i = 0; i < names.length; i++) {
router.get('/' + names[i] + '/:id', controller.get).cache(false);
}


require('http').createServer(router).listen(2048);
