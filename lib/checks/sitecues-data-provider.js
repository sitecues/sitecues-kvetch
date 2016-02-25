'use strict';

const constants = require('../constants');

function check(rawContent, $) {
  const numScriptsWithCorrectDataProvider = $('script[data-provider="sitecues"]').length,
    RESULT_ZERO = 'Need at least one <script> with data-provider="sitecues"',
    RESULT_TOO_MANY = 'More than one <script> with data-provider="sitecues"';

  // Failure too few
  if (numScriptsWithCorrectDataProvider === 0) {
    return RESULT_ZERO;
  }

  // Failure too many
  if (numScriptsWithCorrectDataProvider >= 2) {
    return RESULT_TOO_MANY;
  }

  // Success
}

module.exports = {
  check: check,
  severity: constants.SEVERITY.CRITICAL
};
