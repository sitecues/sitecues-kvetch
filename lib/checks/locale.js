'use strict';

const constants = require('../constants');

function check(rawContent, $, checkOptions) {
  const RESULT_NO_LOCALE = 'No locale specified on html or body -- should use lang attribute',
    RESULT_INVALID_LOCALE = 'Specified locale in the lang attribute is not a valid ISO value',
    VALID_LOCALE_REGEX = /^[a-z]{2,3}(?:-[A-Z]{2,3}(?:-[a-zA-Z]{4})?)?$/,
    $html = $('html'),
    $body = $('body'),
    locale = $html.attr('lang') || $html.attr('xml:lang') || $body.attr('lang') || $body.attr('xml:lang');

  // Failure need lang attribute
  if (!locale) {
    return RESULT_NO_LOCALE;
  }

  if (!locale.match(VALID_LOCALE_REGEX)) {
    return RESULT_INVALID_LOCALE;
  }

  // Success
}

module.exports = {
  check,
  severity: constants.SEVERITY.NORMAL
};
