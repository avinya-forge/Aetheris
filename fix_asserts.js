const fs = require('fs');
const glob = require('glob'); // Note: we might just use find if we don't want to rely on glob package being installed

const tests = glob.sync('tests/**/*.js');
// Let's use pure bash for this
