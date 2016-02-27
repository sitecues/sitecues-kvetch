'use strict';

const 
  config = {
    checks: process.env.CHECKS,
    minSeverity: process.env.MINSEVERITY,
    maxSeverity: process.env.MAXSEVERITY,
    urls: process.env.URLS,
    urlFile: process.env.URLFILE,
    view: process.env.VIEW,
    outFile: process.env.OUTFILE
  };

module.exports = config;
