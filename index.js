#! /usr/bin/env node

var config = require('nconf').argv().env().defaults({
  target: 'tv',
  message: ''
});
var Capturer = require('meat-capture');
var capturer = new Capturer();
var Poster = require('meat-post');
var poster = new Poster(config.get());
var Interval = require('meat-interval');
var interval = new Interval(capturer, poster);

if (config.get('interval')) {
  interval.update(parseInt(config.get('interval'), 10), config.get('message'));
}
else {
  capturer.capture(function(error, gif) {
    if (err) throw err;
    poster.send(config.get('message'), gif, function(err) {
      if (err) throw err;
    });
  });
}
