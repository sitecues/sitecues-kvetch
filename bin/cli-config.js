// Environment variables:
// Choose checks:
// - CHECKS: comma-separated list of test file names (leave empty to run all checks)
// Choose urls (use of one the following):
// - URLS: comma-separated list of urls to test
// - URLFILE: newline-separated list of urls to test
// Choose view type (default text):
// - VIEW:
//   - csv (for import into spreadsheet)
//   - html (friendly html)
//   - json (raw report)
//   - text (best for console)
// Choose output file (default stdout)
// - OUTFILE

'use strict';

const 
  config = {
    checks: process.env.CHECKS,
    urls: process.env.URLS,
    urlFile: process.env.URLFILE,
    view: process.env.VIEW,
    errorsOnly: process.env.ERRORSONLY === 'true',
    outFile: process.env.OUTFILE
  };

module.exports = config;
