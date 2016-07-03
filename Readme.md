Node.js Router Benchmarks
=========================

I have a ~~6 month~~ 5 year old node.js app that was built in a time of fear, uncertainty, and limited server resources.  I thought that we should be squeezing as much as possible out of the single VPS we had, so I ended up using a homegrown regex-based router.  Now that we want to bring some more structure to the app, I started looking at routers and discovered there were a bunch of options.

Running all tests
-------
```
npm install
./run.sh
```
* The tests results will be written in the folder `results`
* Sample output http://pastebin.com/VA6v4NrR
* You need to have installed on your system `node` and `wrk`
* You can install wrk with `brew wrk` or `apt-get install wrk`
* You can run a single test with `./run.sh [routername]`
* You can set the duration of each run by setting an environment variable: `DURATION=20s`

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

This is just a control benchmark. Its not routing anything.


light-router
-----

Well-performing router with API similar to others.


Results overview
-------
```
Tested on a desktop Intel Core i7 4790k.
```

```
              Node v6.2.0     Node v4.4.5     Node v0.10.46   Node 7.0pre (7cbbec516)
Route number  1st       20th  1st	  20th    1st	  20th    1st	  20th

barista	      23,563  15,494  23,792  13,519  21,937  5,580	  24,109  16,257
choreographer 33,446  31,633  29,118  27,791  23,869  22,704  29,864  28,415
clutch	      26,869  20,094  24,902  17,357  22,593  6,270	  27,278  21,387
connect	      31,260  29,715  28,524  27,407  20,328  19,540  31,702  29,729
escort	      31,035  31,972  30,063  30,786  23,573  23,724  32,047  32,248
express	      24,565  23,515  21,468  20,253  20,736  20,001  23,255  22,119
http-hash	  35,525  35,765  34,341  34,026  36,654  36,598  33,940  34,426
i40	          35,394  33,602  30,015  28,993  31,679  29,830  32,870  30,271
light-router  32,679  32,842  31,513  31,740  32,954  33,314  34,072  33,993

regex	      36,907  34,089  36,894  33,977  37,868  34,321  36,477  33,219
raw http	  38,961  39,331  37,996  38,986  33,610  33,955  39,136  39,575
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

*Update 2016-07-02:* Escort has been abandoned and while I've maintained a fork that keeps it working, it's not a choice I would make now. All of the routers are pretty fast and introduce minimal overhead so at this point I would probably choose the one with a feature set that best fit my needs rather than focusing on performance.
