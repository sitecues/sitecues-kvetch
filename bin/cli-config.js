'use strict';

const 
  config = {
    checks: process.env.CHECKS,
    minSeverity: process.env.MINSEVERITY,
    maxSeverity: process.env.MAXSEVERITY,
    urls: process.env.URLS,
    urlSet: process.env.URLSET,
    view: process.env.VIEW,
    outFile: process.env.OUTFILE
  };

module.exports = config;
