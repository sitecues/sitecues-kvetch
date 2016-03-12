'use strict';

const constants = require('./constants'),
  got = require('got');

function runChecks(checkModules, rawContent) {
  const reportEntry = {};

  const $ = require('cheerio').load(rawContent);

  Object.keys(checkModules).forEach((checkName) => {
    const
      checkModule = checkModules[checkName],
      result = checkModule.check(rawContent, $);

    if (result) {
      reportEntry[checkName] = result;
    }
  });

  return reportEntry;
}

function runChecksForUrls(urls, checkModules) {
  function checkOneUrl(url) {
    return got(url, {retries: 1, timeout: 8000 })
      .then((response) => {
        return {
          url,
          checks: runChecks(checkModules, response.body)
        };
      })
      .catch((error) => {
        console.error(error);
        const reportEntry = {
          url,
          checks: {
            fetch: `Error: ${error}`
          }
        };
        return reportEntry;
      });
  }

  return urls.map(checkOneUrl);
}

function filterResults(config, reportEntries, checkModules) {
  function getSeverity(checkName) {
    return checkModules[checkName] ? checkModules[checkName].severity : constants.SEVERITY.CRITICAL;
  }

  if (config.minSeverity || config.maxSeverity < constants.SEVERITY.CRITICAL) {
    // Remove items with no errors
    reportEntries.forEach((entry) => {
      Object.keys(entry.checks).forEach((checkName) => {
        if (!entry.checks[checkName]) {
          delete entry.checks[checkName];
        }
      });
    });

    if (config.showAll) {
      return reportEntries;
    }

    // Remove report entries when everything was successful or not severe enough
    // Or some items are too severe
    return reportEntries.filter((entry) => {
      const allChecks = Object.keys(entry.checks);
      return allChecks.length &&
        allChecks.some(checkName => getSeverity(checkName) >= config.minSeverity) &&
        allChecks.every(checkName => getSeverity(checkName) <= config.maxSeverity);
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

  const configFinalizer = require('./config-finalizer.js'),
    config = configFinalizer(options),
    checkModules = getCheckModules(config.checks),
    allGotPromises = runChecksForUrls(config.urls, checkModules);

  return Promise.all(allGotPromises)
    .then((reportEntries) => {
      const filteredEntries = filterResults(config, reportEntries, checkModules),
        viewModule = require('./views/' + config.view),
        rawReport = viewModule(config, filteredEntries);

      console.log('\nNumber of report entries: ', filteredEntries.length);
      return rawReport;
    });
}

module.exports = run;

