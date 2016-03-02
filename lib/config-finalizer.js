// Run bin/kvetch-cli to see options

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


// Use URLS or URLSET
function getUrls(urls) {
  if (urls) {
    const urlsArray = urls.split(',').filter(url => Boolean(url));
    return urlsArray.length && urlsArray;
  }
}

function getUrlsFromFile(urlFile) {
  const fs = require('fs'),
    sanitizedFileName = urlFile.indexOf('/') >= 0 ? urlFile : constants.DEFAULT_URL_FILE_FOLDER + urlFile + '.txt',
    urlBuffer = fs.readFileSync(sanitizedFileName);
  if (urlBuffer) {
    const dataLines = urlBuffer.toString().split('\n').filter(url => url.trim() !== '');
    return dataLines.map(dataLine => dataLine.split(' ')[0]); // First column only
  }
}

function finalizeConfig(options) {
  const 
    DEFAULT_VIEW = 'text',
    DEFAULT_URLSET = 'all',
    config = {
      checks: getChecks(options.checks) || getAllChecks(),  // undefined means run all checks
      minSeverity: getSeverity(options.minSeverity) || constants.SEVERITY.NONE,
      maxSeverity: getSeverity(options.maxSeverity) || constants.SEVERITY.CRITICAL,
      urls: getUrls(options.urls) || getUrlsFromFile(options.urlSet || DEFAULT_URLSET),
      view: options.view || DEFAULT_VIEW,
      showAll: options.showAll === 'on'
    };
  console.log('\nConfiguration:\n', config, '\n');
  return config;
}

module.exports = finalizeConfig;
