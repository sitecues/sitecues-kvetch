'use strict';

const STATUS_SUCCESSFULLY_LOADED = 'successfully loaded',
    STATUS_NOT_LOADED_YET = 'not loaded yet',
    REQUEST_TIMEOUT = 10000;

function runCheck(checkName, rawContents, $) {
  const check = require('./checks/' + checkName);

  return check(rawContents, $) || 'Success';
}

function runChecks(reportEntry, checks, rawContent) {
  reportEntry.status = STATUS_SUCCESSFULLY_LOADED;

  const cheerio = require('cheerio'),
    $ = cheerio.load(rawContent);

  for (let checkName of checks) {
    reportEntry.results[checkName] = runCheck(checkName, rawContent, $);
  }
}

function runChecksForUrls(urls, checks, report) {
  const got = require('got');

  let allGotPromises = [];

  // Run all checks for all files
  for (let url of urls) {
    report[url] = { 
      status: STATUS_NOT_LOADED_YET,
      results: {}
    };
    allGotPromises.push(
      got(url, { timeout: REQUEST_TIMEOUT })
        .then(response => {
          console.log('Loaded ' + url);
          runChecks(report[url], checks, response.body);
        })
        .catch(error => {
          console.log(error);
          report[url].status = 'Error: ' + error;
        })
    );
  }

  return allGotPromises;
}

function run(options) {

  // Crash and burn, die fast if a rejected promise is not caught.
  process.on('unhandledRejection', function (err) {
      throw err;
  });

  const configFinalizer = require('./config-finalizer.js'),
    config = configFinalizer(options),
    report = {},
    allGotPromises = runChecksForUrls(config.urls, config.checks, report);

  return Promise.all(allGotPromises)
    .then(values => {
      const viewModule = require('./views/' + config.view),
        rawReport = viewModule(config, report);
      return rawReport;
    });
}

module.exports = run;

