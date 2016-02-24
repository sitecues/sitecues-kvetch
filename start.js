'use strict';

const config = require('./config.js'),
  report = {},
  viewModule = require('./views/' + config.view),
  numUrlsRemaining = config.urls.length,
  STATUS_SUCCESSFULLY_LOADED = 'successfully loaded',
  STATUS_NOT_LOADED_YET = 'not loaded yet';

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

  console.log('hi ' + numUrlsRemaining);
  numUrlsRemaining = numUrlsRemaining - 1;
  if (numUrlsRemaining === 0) {
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
      console.log(error.response.body);
      report[url].status = 'Error: ' + error.response.body;
      urlComplete();
    });
}



