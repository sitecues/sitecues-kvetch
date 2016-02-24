'use strict';

const config = require('./config.js'),
  report = {},
  viewModule = require('./views/' + config.view),
  STATUS_SUCCESSFULLY_LOADED = 'successfully loaded',
  STATUS_NOT_LOADED_YET = 'not loaded yet';

let numUrlsRemaining = config.urls.length;

function runTest(url, testName, contents, $) {
  const test = require('./tests/' + testName);

  return test(url, contents, $) || 'Success';
}

function runTests(url, contents) {
  report[url].status = STATUS_SUCCESSFULLY_LOADED;

  const cheerio = require('cheerio'),
    $ = cheerio.load(contents);

  for (let testName of config.tests) {
    report[url].results[testName] = runTest(url, testName, contents, $);
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

// Run all tests for all files
for (let url of config.urls) {
  report[url] = { 
    status: STATUS_NOT_LOADED_YET,
    results: {}
  };
  const got = require('got');
  got(url)
    .then(response => {
      console.log('Loaded ' + url);
      runTests(url, response.body);
    })
    .catch(error => {
      console.log(error);
      report[url].status = 'Error: ' + error;
      urlComplete();
    });
}



