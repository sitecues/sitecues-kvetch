'use strict';

const constants = require('../constants');

function check(rawContent, $, checkOptions) {
  const
    $configScript = $('script[data-provider="sitecues"]').first(),
    matches = $configScript.text().match(/siteId = '(s-\w{8})'/),
    match = (matches && matches.length > 1) ? matches[1] : null,
    badIds = ['s-41ceeb5f', 's-70b96e72', 's-1596260c', 's-482d53c7', 's-1f9c2da4', 's-00000005', 's-XXXXXXXX'],
    RESULT_NO_SITE_ID = 'Could not find a valid site id.',
    RESULT_WRONG_SITE_ID = 'An invalid site id is being used (%s).',
    RESULT_MISMATCHED_SITE_ID = 'The designated site id (%1) does not match the site id found (%2).';
      
  // No site id found
  if (!match) {
    return RESULT_NO_SITE_ID;
  }
    
  // Wrong site id found
  if (badIds.indexOf(match) >= 0) {
    return RESULT_WRONG_SITE_ID.replace('%s', match);
  }
  
  // Mismatched site id
  if (typeof checkOptions.siteid !== 'undefined' && match !== checkOptions.siteid) {
    return RESULT_MISMATCHED_SITE_ID.replace('%1', checkOptions.siteid).replace('%2', match);
  }

  // Success
}

module.exports = {
  check: check,
  severity: constants.SEVERITY.CRITICAL
};
