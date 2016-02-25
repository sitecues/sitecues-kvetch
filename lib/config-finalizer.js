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
    return urlBuffer.toString().split('\n').filter(url => url.trim() !== '');
  }
}

function finalizeConfig(options) {
  const 
    DEFAULT_VIEW = 'json',
    config = {
      checks: getChecks(options.checks) || getAllChecks(),  // undefined means run all checks
      urls: getUrls(options.urls) || getUrlsFromFile(options.urlFile || 'data/all-sites.txt'),
      view: options.view || DEFAULT_VIEW,
      errorsOnly: options.errorsOnly
    };
  console.log('\nConfiguration:\n', config, '\n');
  return config;
}

module.exports = finalizeConfig;
