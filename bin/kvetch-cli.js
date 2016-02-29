'use strict';

const
  constants = require('../lib/constants'),
  severityOptions = Object.keys(constants.SEVERITY),
  config = require('yargs').usage('Usage: $0 <command> [options]')
    .describe('checks', 'Comma-separated lists of checks from lib/checks/ folder (default = all)')
    .string('checks')
    .describe('minSeverity', 'Minimum severity of issue before all issues in website shown')
    .choices('minSeverity', severityOptions)
    .describe('maxSeverity', 'Maximum severity of issue before all issues in website hidden')
    .choices('maxSeverity', severityOptions)
    .describe('urls', 'Comma-separated list of urls')
    .string('urls')
    .describe('urlSet', 'Name of file containing urls in the first column from data/ folder, e.g. classic|all (default = all)')
    .string('urlSet')
    .describe('view', 'Name of view to use, e.g. text|json|html (default = json')
    .string('view')
    .help('h')
    .alias('h', 'help')
    .argv,
  checker = require('../lib/checker.js');

checker(config) // No need to catch errors for now -- just let exception through
  .then(function(rawReport) {
    // TODO use winston library if we need more advanced logging
    console.log('\n\nWriting report ...');
    console.log(rawReport);
    console.log('Finished'); 
  });
