// Environment variables:
// Choose checks:
// - CHECKS: comma-separated list of check names (leave empty to run all checks)
// Choose urls (use of one the following):
// - URLS: comma-separated list of urls to check
// - URLFILE: newline-separated list of urls to check
// Choose view type (default text):
// - VIEW:
//   - html (friendly html)
//   - csv (for import into spreadsheet)
//   - text (best for console)
// Choose output file (default stdout)
// - OUTFILE

'use strict';

const constants = require('./constants');

function getChecks(checks) {
  if (checks) {
    return checks.split(',');
  }
}

function getAllChecks() {
  // Use all checks (contents of checks/*.js)
  const glob = require('glob-fs')({ gitignore: true }),
    files = glob.readdirSync('lib/checks/*.js');

  return files ? files.map(fileName => fileName.split('checks/')[1].split('.js')[0]) : [];
}

function getSeverity(severity) {
  return constants.SEVERITY[severity];
}


// Use URLS or URLFILE
function getUrls(urls) {
  if (urls) {
    const urlsArray = urls.split(',').filter(url => Boolean(url));
    return urlsArray.length && urlsArray;
  }
}

function getUrlsFromFile(urlFile) {
  const fs = require('fs'),
    urlBuffer = fs.readFileSync(urlFile);
  if (urlBuffer) {
    const dataLines = urlBuffer.toString().split('\n').filter(url => url.trim() !== '');
    return dataLines.map(dataLine => dataLine.split(' ')[0]); // First column only
  }
}

function finalizeConfig(options) {
  const 
    DEFAULT_VIEW = 'text',
    config = {
      checks: getChecks(options.checks) || getAllChecks(),  // undefined means run all checks
      minSeverity: getSeverity(options.minSeverity) || 0,
      maxSeverity: getSeverity(options.maxSeverity) || constants.SEVERITY.CRITICAL,
      urls: getUrls(options.urls) || getUrlsFromFile(options.urlFile || 'data/all-sites.txt'),
      view: options.view || DEFAULT_VIEW
    };
  console.log('\nConfiguration:\n', config, '\n');
  return config;
}

module.exports = finalizeConfig;
