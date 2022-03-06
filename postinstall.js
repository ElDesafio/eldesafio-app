const fs = require('fs');

const copyFrom = 'app/lib/sloppy/sloppy.js';
const copyTo = 'node_modules/domino/lib/sloppy.js';

console.log('Copying: ', copyFrom, '->', copyTo);

fs.copyFile(copyFrom, copyTo, (err) => {
  if (err) throw err;
  console.log('sloppy.js was patched');
});
