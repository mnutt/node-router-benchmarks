Node.js Router Benchmarks
=========================

I have a 6 month old node.js app that was built in a time of fear, uncertainty, and limited server resources.  I thought that we should be squeezing as much as possible out of the single VPS we had, so I ended up using a homegrown regex-based router.  Now that we want to bring some more structure to the app, I started looking at routers and discovered there were a bunch of options.

Running all tests
-------
```
npm install
./run.sh
```
* The tests results will be written in the folder `results-2014`
* Sample output http://pastebin.com/VA6v4NrR
* You need to have installed on your system `node` and `wrk`
* You can install wrk with `brew wrk`


barista
-------

It uses a convoluted system where you call router.first() to give you a set of params.  Then you're on your own to call the right controller function.  It's the only one that doesn't seem to do this, so maybe I'm doing something wrong.  It also has the unique feature that you can fire *all* matching routes, though I can't think of a use case for doing so.


choreographer
-------------

Pretty traditional clean syntax, similar to the others.


clutch
------

Regex-based routes.  I'm not a huge fan of passing the routes in a big array, but it works fine.  Falls off pretty sharply with lots of routes.


connect
-------

More than just a router, it's a middleware.  It uses rails-style routes.  Attaches params to the request object.


escort
------

While it's built on top of connect, it replaces and is actually faster than connect's own router. (most likely due to the routing cache)


regex
-----

This is just a really hacky router that loops through regexes.  It's the fastest, but you probably shouldn't use it.


rawhttp
-----

This is just a control benchmark. Its not routing anything


light-router
-----

Waiting for a review :)


Results overview
-------
```
Tested on a MacBook Pro 13" 2012 @2,4Ghz i5
```

```
router                   first route  20th route
-----------------------------------------
barista                  8114.13         2214.44
choreographer            9470.82         8944.37
clutch                   8433.79         2332.45
connect                  7848.29         7227.07
escort                   8828.66         8622.83
journey                  4770.10         4423.57
regex                    11233.89        9814.03
express                  7697.21         6825.72
light-router             10414.99        10270.18
light-router (no-cache)  10502.09        10052.09
rawhttp                  10887.88        10407.13
```


Conclusions
-----------

Of the seven routers tested, 5 of them were pretty close together.  Barista looks like it's slower because of all of the string manipulation it does prior to the regex check.  Since it has to do that on each route before it bails and tries the next one, performance decreases much more quickly as more routes are added.  Compare what barista does in its check:

    // let's chop off the QS to make life easier
    var url = require('url').parse(urlParam)
    var path = url.pathname
    var params = {method:method}

    for (var key in self.params) { params[key] = self.params[key] }

    // if the method doesn't match, gtfo immediately
    if (typeof self.method != 'undefined' && self.method != params.method) return false

    /* TODO: implement substring checks for possible performance boost */

    // if the route doesn't match the regex, gtfo
    if (!self.test(path)) {
      return false
    }

... to what choreographer does in its check, where each route is just a regex:

    var matches = route.exec(path);

    for(var i = 0; i < len; i += 1)
    {
      //say '/foo/bar/baz' matches '/foo/*/*'
      var route = _routes[i], matches = route.exec(path);
      if(matches) //then matches would be ['/foo/bar/baz','bar','baz']
      { ... }
    }

Some routers, like escort, also keep a cache for dynamic routes that most likely accounts for their higher performance.  Since routing doesn't generally change that much during app execution, it's a pretty safe optimization.

Keep in mind that this is a microbenchmark, and as such, the conclusions that can be drawn are limited in scope.  I just wanted to see what sort of request overhead each router added, and how req/s falls off as the number of routes grows.

I think we're going to end up choosing connect + escort.  Many of the routers are pretty close to the regex parsing speed, and connect provides enough other benefits that I think it's worth using on a larger-scale project.
