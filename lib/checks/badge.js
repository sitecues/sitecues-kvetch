'use strict';

const constants = require('../constants');

function check(rawContent, $) {
  const $badges = $('[id="sitecues-badge"]'), // Use attribute selector to make sure we catch instances of > 1 badge
    numBadges = $badges.length,
    RESULT_BADGE_IMG = 'Old-style badge image',
    RESULT_TOO_MANY = 'More than one #sitecues-badge';

  // Failure too many
  if (numBadges >= 2) {
    return RESULT_TOO_MANY;
  }

  // Failure old badge img
  if ($badges.is('img')) {
    return RESULT_BADGE_IMG;
  }

  // Success
}

module.exports = {
  check,
  severity: constants.SEVERITY.CRITICAL
};
