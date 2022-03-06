const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const { createRequestHandler } = require('@remix-run/express');

import * as serverBuild from '@remix-run/dev/server-build';

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// Remix fingerprints its assets so we can cache forever.
app.use(
  '/build',
  express.static('public/build', { immutable: true, maxAge: '1y' }),
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public/build', { maxAge: '1h' }));

app.use(function (req, res, next) {
  if (
    process.env.NODE_ENV !== 'development' &&
    req.get('X-Forwarded-Proto') == 'http'
  ) {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  } else {
    next();
  }
});

app.use(morgan('tiny'));

app.all(
  '*',
  createRequestHandler({
    build: serverBuild,
    mode: process.env.NODE_ENV,
  }),
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
