'use strict';

function runChecks(checkModules, rawContent) {
  const reportEntry = {
  };

  const cheerio = require('cheerio'),
    $ = cheerio.load(rawContent);

  Object.keys(checkModules).forEach(checkName => {
    const checkModule = checkModules[checkName],
      result = checkModule.check(rawContent, $);

    if (result) {
      reportEntry[checkName] = result;
    }
  });

  return reportEntry;
}

function runChecksForUrls(urls, checkModules) {
  const got = require('got');

  let allGotPromises = [];

  // Run all checks for all files
  for (let url of urls) {
    allGotPromises.push(
      got(url, {retries: 1, timeout: 8000 })
        .then(response => {
          return {
            url: url,
            checks: runChecks(checkModules, response.body)
          };
        })
        .catch(error => {
          console.log(error);
          const reportEntry = {
            url: url,
            checks: {
              fetch: 'Error: ' + error 
            }
          };
          return reportEntry;
        })
    );
  }

  return allGotPromises;
}

function filterResults(config, reportEntries, checkModules) {
  if (config.minSeverity) {
    // Remove items with no errors
    reportEntries.forEach(entry => {
      Object.keys(entry.checks).forEach(checkName => {  
        if (!entry.checks[checkName]) {
          delete entry.checks[checkName];
        }
      });
    });

    return reportEntries.filter(entry => {
      // Remove report entries when everything was successful or not severe enough
      const allChecks = Object.keys(entry.checks);
      return allChecks.length && 
        allChecks.some(checkName => checkModules[checkName] && checkModules[checkName].severity >= config.minSeverity);
    });
  }
  return reportEntries;
}

function getCheckModules(checks) {
  const checkModules = {};
  checks.forEach(check => checkModules[check] = require('./checks/' + check));
  return checkModules;
}

function run(options) {

  // Crash and burn, die fast if a rejected promise is not caught.
  process.on('unhandledRejection', function (err) {
      throw err;
  });

  const configFinalizer = require('./config-finalizer.js'),
    config = configFinalizer(options),
    checkModules = getCheckModules(config.checks),
    allGotPromises = runChecksForUrls(config.urls, checkModules);

  return Promise.all(allGotPromises)
    .then(reportEntries => {
      const filteredEntries = filterResults(config, reportEntries, checkModules),
        viewModule = require('./views/' + config.view),
        rawReport = viewModule(config, filteredEntries);

      console.log('\nNumber of report entries: ', filteredEntries.length);
      return rawReport;
    });
}

module.exports = run;

