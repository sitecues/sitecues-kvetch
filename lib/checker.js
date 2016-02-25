'use strict';

const STATUS_SUCCESSFULLY_LOADED = 'successfully loaded';

function runCheck(checkName, rawContents, $) {
  const check = require('./checks/' + checkName);

  return check(rawContents, $) || 'Success';
}

function runChecks(checks, rawContent) {
  const reportEntry = {
    status: STATUS_SUCCESSFULLY_LOADED,
    results: {}
  };

  const cheerio = require('cheerio'),
    $ = cheerio.load(rawContent);

  for (let checkName of checks) {
    reportEntry.results[checkName] = runCheck(checkName, rawContent, $);
  }

  return reportEntry;
}

function runChecksForUrls(urls, checks) {
  const got = require('got');

  let allGotPromises = [];

  // Run all checks for all files
  for (let url of urls) {
    allGotPromises.push(
      got(url)
        .then(response => {
          const reportEntry = {};
          reportEntry[url] = runChecks(checks, response.body);
          return reportEntry;
        })
        .catch(error => {
          console.log(error);
          const reportEntry = {};
          reportEntry[url] = { status: 'Error: ' + error };
          return reportEntry;
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
    allGotPromises = runChecksForUrls(config.urls, config.checks);

  return Promise.all(allGotPromises)
    .then(reportEntries => {
      const viewModule = require('./views/' + config.view),
        rawReport = viewModule(config, reportEntries);
      return rawReport;
    });
}

module.exports = run;

