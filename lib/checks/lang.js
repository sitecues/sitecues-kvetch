'use strict';

const constants = require('../constants');

function check(rawContent, $) {
  const RESULT_NO_LANG_ATTRIBUTE = 'No language specified on html or body -- should use lang attribute',
    $html = $('html'),
    $body = $('body');

  // Failure need lang attribute
  if (!$html.attr('lang') && !$html.attr('xml:lang') && !$body.attr('lang') && !$body.attr('xml:lang')) {
    return RESULT_NO_LANG_ATTRIBUTE;
  }
  // Success
}

module.exports = {
  check,
  severity: constants.SEVERITY.NORMAL
};
