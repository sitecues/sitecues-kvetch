'use strict';

const constants = require('../constants');

function check(rawContent, $) {
  const numMooToolsScripts = $('script[src*="mootools"]').length,
    RESULT_ANY = 'Mootools in incompatible with sitecues because of the way it overrides native functionality.';

  // Failure any
  if (numMooToolsScripts) {
    return RESULT_ANY;
  }

  // Success
}

module.exports = {
  check: check,
  severity: constants.SEVERITY.CRITICAL
};
