'use strict';

const constants = require('../constants');

function check(rawContent, $) {
  const
    $loadScript = $('script[data-provider="sitecues"]').first(),
    loadScriptText = $loadScript.text().replace(/\s\s+/g, ' ').trim(), // Replace multiple whitespace chars
    EXPECTED_TEXT = '// DO NOT MODIFY THIS SCRIPT WITHOUT ASSISTANCE FROM SITECUES ' +
      'var sitecues = window.sitecues = window.sitecues || {}; sitecues.config = sitecues.config || {}; sitecues.config.',
    RESULT_WRONG_CONTENTS = 'Load script does not follow expected pattern: ',
    RESULT_BAD_SITE_ID_FORMAT = 'Load script does not follow expected pattern for setting siteId: ';

  if ($loadScript.length !== 1) {
    return; // Incorrect number of load scripts error is caught elsewhere
  }

  // Wrong contents at start of load script text
  // config script is optional so this passes if there isn't one
  if (loadScriptText.indexOf(EXPECTED_TEXT) !== 0) {
    return RESULT_WRONG_CONTENTS + '\nExpected: ' + EXPECTED_TEXT + '\nActual  : ' + loadScriptText.substr(0, EXPECTED_TEXT.length);
  }

  const siteIdPos = EXPECTED_TEXT.length,
    siteIdSubstring = loadScriptText.substr(siteIdPos);

  // Wrong format for setting site id or wrong site id format
  if (!siteIdSubstring.match(/^site(Id|_id) ?\= ?\'(s-[0-9a-z]{8})\'/)) {
    return RESULT_BAD_SITE_ID_FORMAT + siteIdSubstring.substr(0, 22); 
  }

  // Success
}

module.exports = {
  check: check,
  severity: constants.SEVERITY.SEVERE
};
