'use strict';

function checkConfigContents(rawContent, $) {
  const
    $configScript = $('script[data-provider="sitecues-config"],script#sitecues-config').first(),
    configScriptText = $configScript.text().replace(/\s\s+/g, ' '), // Replace multiple whitespace chars
    EXPECTED_TEXT = 'var sitecues = window.sitecues = window.sitecues || {}; sitecues.config = sitecues.config || {}',
    RESULT_WRONG_CONTENTS = 'Config script does not follow expected pattern';

  // Wrong contents at start of config script text
  if (configScriptText.indexOf(EXPECTED_TEXT) !== 0) {
    return RESULT_WRONG_CONTENTS;
  }

  // Success
}

module.exports = checkConfigContents;