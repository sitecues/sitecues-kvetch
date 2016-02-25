'use strict';

const constants = require('../constants');

function check(rawContent, $) {
  const numScriptsWithIncorrectDataProvider = $('script[id="sitecues-config"]').length,
    $configScripts = $('script[data-provider="sitecues-config"]'),
    numScriptsWithCorrectDataProvider = $configScripts.length,
    RESULT_WRONG_ATTR = 'Sitecues config <script> should use data-provider="sitecues-config" (not @id)',
    RESULT_TOO_MANY = 'More than one <script> with data-provider="sitecues-config"';


  // Failure using id attribute
  if (numScriptsWithIncorrectDataProvider) {
    return RESULT_WRONG_ATTR;
  }

  // Failure too many
  if (numScriptsWithCorrectDataProvider >= 2) {
    return RESULT_TOO_MANY;
  }

  // Success
}

module.exports = {
  check: check,
  severity: constants.SEVERITY.NORMAL
};