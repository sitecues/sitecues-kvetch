'use strict';

const constants = require('../constants');

function check(rawContent, $) {
  const
    scriptText = $('script[data-provider="sitecues"]').first().text(),
    OLD_PROP_1 = 'site_id',
    OLD_PROP_2 = 'script_url',
    RESULT_DEPRECATED_PROPS = 'Sitecues script uses deprecated names (site_id or script_url). Should be siteId or scriptUrl.';

  // Uses site_id or script_url
  if (scriptText.indexOf(OLD_PROP_1) >= 0 || scriptText.indexOf(OLD_PROP_2) >= 0) {
    return RESULT_DEPRECATED_PROPS;
  }

  // Success
}

module.exports = {
  check: check,
  severity: constants.SEVERITY.MINOR
};