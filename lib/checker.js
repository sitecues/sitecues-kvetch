'use strict';

const CHECK_SUCCESS_VALUE = true;

function runCheck(checkName, rawContents, $) {
  const check = require('./checks/' + checkName);

  return check(rawContents, $) || CHECK_SUCCESS_VALUE;
}

function runChecks(checks, rawContent) {
  const reportEntry = {
    loadStatus: CHECK_SUCCESS_VALUE,
  };

  const cheerio = require('cheerio'),
    $ = cheerio.load(rawContent);

  for (let checkName of checks) {
    reportEntry[checkName] = runCheck(checkName, rawContent, $);
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
          return {
            url: url,
            checks: runChecks(checks, response.body)
          };
        })
        .catch(error => {
          console.log(error);
          const reportEntry = {
            url: url,
            checks: {
              loadStatus: 'Error: ' + error 
            }
          };
          return reportEntry;
        })
    );
  }

  return allGotPromises;
}

function filterResults(config, reportEntries) {
  if (config.errorsOnly) {
    reportEntries.forEach(entry => {
      Object.keys(entry.checks).forEach(checkName => {
        if (entry.checks[checkName] === CHECK_SUCCESS_VALUE) {
          delete entry.checks[checkName];
        }
      });
    });

    return reportEntries.filter(entry => Object.keys(entry.checks).length); // Remove report entries when everything was successful
  }
  return reportEntries;
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
      const filteredEntries = filterResults(config, reportEntries),
        viewModule = require('./views/' + config.view),
        rawReport = viewModule(config, filteredEntries);
      return rawReport;
    });
}

module.exports = run;

