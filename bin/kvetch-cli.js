'use strict';

const config = require('./cli-config.js'),
  checker = require('../lib/checker.js'),
  fs = require('fs');

checker(config) // No need to catch errors for now -- just let exception through
  .then(function(rawReport) {
    console.log('\n\nWriting report ...');
    if (config.outFile) {
      fs.writeFileSync(config.outFile, rawReport);
    }
    else {
      console.log(rawReport);
    }
    console.log('Finished'); 
  });
