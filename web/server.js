'use strict';

const Hapi = require('hapi'),
  server = new Hapi.Server(),
  checker =require('../lib/checker.js');

server.connection({ port: parseInt(process.env.PORT, 10) || 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    const 
      config = {
        checks: (request.query.checks || '').match(/[a-z,-]+/), // Only accept lowercase letters, comma, hyphen
        minSeverity: (request.query.minSeverity || '').match(/[A-Z]+/),
        maxSeverity: (request.query.maxSeverity || '').match(/[A-Z]+/),
        urls: request.query.urls,
        urlSet: (request.query.urlSet || '').match(/[a-z]+/), // Only accept lowercase letters
        view: 'json'
      };
    checker(config) // No need to catch errors for now -- just let exception through
      .then(function(rawReport) {
        reply(rawReport);
      });
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

