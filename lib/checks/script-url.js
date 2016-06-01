'use strict';

const constants = require('../constants');

function check(rawContent, $) {
  const
    $loadScript = $('script[data-provider="sitecues"]').first(),
    loadScriptText = $loadScript.text().replace(/\s\s+/g, ' ').trim(), // Replace multiple whitespace chars
    EXPECTED_TEXT = '\'https://js.sitecues.com/l/s;id=\'+sitecues.config.siteId+\'/js/sitecues.js\';',
    RESULT_WRONG_CONTENTS = 'scriptUrl does not follow expected pattern: ';

  if ($loadScript.length !== 1) {
    return; // Incorrect number of load scripts error is caught elsewhere
  }

  // Wrong contents at start of load script text
  // config script is optional so this passes if there isn't one
  if (loadScriptText.indexOf(EXPECTED_TEXT) < 0) {
    var actualTextIndex = loadScriptText.indexOf('sitecues.config.script'),
      startActualTextIndex = actualTextIndex < 0 ? -1 : loadScriptText.indexOf('=', actualTextIndex) + 1,
      endActualTextIndex = loadScriptText.indexOf('\';', startActualTextIndex) + 2,
      actualMsg = actualTextIndex < 0 ? '' : '\nActual: ' + loadScriptText.substring(startActualTextIndex, endActualTextIndex);

    return RESULT_WRONG_CONTENTS + '\nExpected: ' + EXPECTED_TEXT + actualMsg;
  }

  // Success
}

module.exports = {
  check: check,
  severity: constants.SEVERITY.SEVERE
};
