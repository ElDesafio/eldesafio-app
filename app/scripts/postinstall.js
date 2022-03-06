const fs = require('fs');

// File destination.txt will be created or overwritten by default.
fs.copyFile(
  'app//lib/sloppy/sloppy.js',
  'node_modules/domino/lib/sloppy.js',
  (err) => {
    if (err) throw err;
    console.log('sloppy.js was patched');
  },
);
