'use strict';

const configFinalizer = require('./config-finalizer.js'),
  report = {},
  viewModule = require('./views/' + config.view),
  STATUS_SUCCESSFULLY_LOADED = 'successfully loaded',
  STATUS_NOT_LOADED_YET = 'not loaded yet';

let numUrlsRemaining = config.urls.length;

function runCheck(url, checkName, contents, $) {
  const check = require('./checks/' + checkName);

  return check(url, contents, $) || 'Success';
}

function runChecks(url, contents) {
  report[url].status = STATUS_SUCCESSFULLY_LOADED;

  const cheerio = require('cheerio'),
    $ = cheerio.load(contents);

  for (let checkName of config.checks) {
    report[url].results[checkName] = runCheck(url, checkName, contents, $);
  }

  urlComplete();
}

function urlComplete() {

  if (-- numUrlsRemaining === 0) {
    showReport();
  }
  else {
    console.log(numUrlsRemaining);
  }
}

function showReport() {
  console.log('\n\nReport:');
  viewModule(config, report);
}

// Crash and burn, die fast if a rejected promise is not caught.
process.on('unhandledRejection', function (err) {
    throw err;
});

function runChecks(options) {

  const config = configFinalizer(options);

  // Run all checks for all files
  for (let url of config.urls) {
    report[url] = { 
      status: STATUS_NOT_LOADED_YET,
      results: {}
    };
    const got = require('got');
    got(url)
      .then(response => {
        console.log('Loaded ' + url);
        runChecks(url, response.body);
      })
      .catch(error => {
        console.log(error);
        report[url].status = 'Error: ' + error;
        urlComplete();
      });
  }

}

module.exports = runChecks;

