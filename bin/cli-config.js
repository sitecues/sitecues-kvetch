'use strict';

const 
  config = {
    checks: process.env.CHECKS,
    severity: process.env.SEVERITY,
    urls: process.env.URLS,
    urlFile: process.env.URLFILE,
    view: process.env.VIEW,
    outFile: process.env.OUTFILE
  };

module.exports = config;
