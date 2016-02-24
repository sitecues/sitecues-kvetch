// Environment variables:
// Choose tests:
// - TESTS: comma-separated list of test names (leave empty to run all tests)
// Choose urls (use of one the following):
// - URLS: comma-separated list of urls to test
// - URLFILE: newline-separated list of urls to test
// Choose view type (default text):
// - VIEW:
//   - html (friendly html)
//   - csv (for import into spreadsheet)
//   - text (best for console)
// Choose output file (default stdout)
// - OUTFILE

'use strict';

function getTests(tests) {
  if (tests) {
    return tests.split(',');
  }
}

function getAllTests() {
  // Use all tests (contents of tests/*.js)
  const glob = require('glob-fs')({ gitignore: true }),
    files = glob.readdirSync('tests/*.js');

  return files ? files.map(fileName => fileName.split('tests/')[1].split('.js')[0]) : [];
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
    DEFAULT_VIEW = 'text',
    DEFAULT_OUTFILE = 'stdout';

  return {
    tests: getTests(options.tests) || getAllTests(),  // undefined means run all tests
    urls: getUrls(options.urls) || getUrlsFromFile(options.urlFile || 'data/all-sites.txt'),
    view: options.view || DEFAULT_VIEW,
    outputFile: options.outFile || DEFAULT_OUTFILE
  };
}

module.exports = finalizeConfig;
