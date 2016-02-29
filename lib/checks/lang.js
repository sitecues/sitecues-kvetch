'use strict';

const constants = require('../constants');

function check(rawContent, $) {
  const $lang = $('html[lang],html[xml:lang],body[lang],body[xml:lang]'), // Use attribute selector to make sure we catch instances of > 1 badge
    numLangAttributes = $lang.length,
    RESULT_NO_LANG_ATTRIBUTE = 'No language specified on html or body -- should use lang attribute';

  // Failure need lang attribute
  if (numLangAttributes === 0) {
    return RESULT_NO_LANG_ATTRIBUTE;
  }
  // Success
}

module.exports = {
  check: check,
  severity: constants.SEVERITY.NORMAL
};