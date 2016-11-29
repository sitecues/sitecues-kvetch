'use strict';

const constants = require('../constants');

function check(rawContent, $) {
    const
		$configScript = $('script[data-provider="sitecues"]').first(),
		matches = $configScript.text().match(/siteId = '(s-\w{8})'/),
		match = (matches && matches.length > 1) ? matches[1] : null,
		RESULT_NO_SITE_ID = 'Could not find a valid site id.',
		RESULT_WRONG_SITE_ID = 'The sandbox site id (s-41ceeb5f) is being used.';
		
	// No site id found
	if (!match) {
		return RESULT_NO_SITE_ID;
	}
		
	// Wrong site id found
	if (match == 's-41ceeb5f') {
		return RESULT_WRONG_SITE_ID;
	}

	// Success
}

module.exports = {
  check: check,
  severity: constants.SEVERITY.MAJOR
};
