'use strict';

const NUM_INDENT_SPACES = 2;

function generateTextReport(config, reportEntries) {
  return JSON.stringify(reportEntries, null, NUM_INDENT_SPACES);
}

module.exports = generateTextReport;