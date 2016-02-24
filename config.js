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

function getTests() {
  // TESTS
  const tests = process.env.TESTS; // Comma-separated list of tests
  if (tests) {
    return tests.split(',');
  }

  // Use all tests (contents of tests/*.js)
  const glob = require('glob-fs')({ gitignore: true }),
    files = glob.readdirSync('tests/*.js');

  return files ? files.map(fileName => fileName.split('tests/')[1].split('.js')[0]) : [];
}

// Use URLS or URLFILE
function getUrls() {
  const urls = process.env.URLS,
    urlFile = process.env.URLFILE || 'data/all-sites.txt'; // Comma-separated list of urls

  // URLS
  if (urls) {
    return urls.split(',');
  }

  // URLFILE
  const fs = require('fs'),
    urlBuffer = fs.readFileSync(urlFile);
  if (urlBuffer) {
    return urlBuffer.toString().split('\n').filter(url => url.trim() !== '');
  }
}

const 
  DEFAULT_VIEW = 'text',
  DEFAULT_OUTFILE = 'stdout',
  config = {
    tests: getTests(),  // undefined means run all tests
    urls: getUrls(),
    view: process.env.VIEW || DEFAULT_VIEW,
    outputFile: process.env.OUTFILE || DEFAULT_OUTFILE
  };

console.log('Configuration:\n', config);

module.exports = config;
