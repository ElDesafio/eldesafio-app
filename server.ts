import 'newrelic';

import { createRequestHandler } from '@remix-run/express';
import compression from 'compression';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

app.use((req, res, next) => {
  // helpful headers:
  res.set('x-fly-region', process.env.FLY_REGION ?? 'unknown');
  res.set('Strict-Transport-Security', `max-age=${60 * 60 * 24 * 365 * 100}`);

  // eslint-disable-next-line sonarjs/no-duplicate-string
  const proto = req.get('X-Forwarded-Proto');
  const host = req.get('X-Forwarded-Host') ?? req.get('host');

  // HTTPS-upgrade
  if (proto === 'http') {
    res.set('X-Forwarded-Proto', 'https');
    res.redirect(`https://${host}${req.originalUrl}`);
    return;
  }

  // /clean-urls/ -> /clean-urls
  if (req.path.endsWith('/') && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    const safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
    res.redirect(301, safepath + query);
    return;
  }
  next();
});

// if we're not in the primary region, then we need to make sure all
// non-GET/HEAD/OPTIONS requests hit the primary region rather than read-only
// Postgres DBs.
// learn more: https://fly.io/docs/getting-started/multi-region-databases/#replay-the-request
app.all('*', function getReplayResponse(req, res, next) {
  const { method, path: pathname } = req;
  const { PRIMARY_REGION, FLY_REGION } = process.env;

  const isMethodReplayable = !['GET', 'OPTIONS', 'HEAD'].includes(method);
  const isReadOnlyRegion =
    FLY_REGION && PRIMARY_REGION && FLY_REGION !== PRIMARY_REGION;

  const shouldReplay = isMethodReplayable && isReadOnlyRegion;

  if (!shouldReplay) return next();

  const logInfo = {
    pathname,
    method,
    PRIMARY_REGION,
    FLY_REGION,
  };
  console.info(`Replaying:`, logInfo);
  res.set('fly-replay', `region=${PRIMARY_REGION}`);
  return res.sendStatus(409);
});

// You need to create the HTTP server from the Express app
const httpServer = createServer(app);

// And then attach the socket.io server to the HTTP server

export const socket = new Server(httpServer);

// then list to the connection event and get a socket object
socket.on('connection', (socket) => {
  // here you can do whatever you want with the socket of the client, in this
  // example I'm logging the socket.id of the client
  // console.log(socket.id, 'connected');
  // and I emit an event to the client called `event` with a simple message
  socket.emit('confirmation', 'connected!');
  // and I start listening for the event `something`
  // socket.on('event', (data) => {
  //   // log the data together with the socket.id who send it
  //   console.log(socket.id, data);
  //   // and emeit the event again with the message pong
  //   socket.emit('event', 'pong');
  // });
});

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
app.use(express.static('public', { maxAge: '1h' }));

app.use(morgan('tiny'));

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

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), 'build');

app.all(
  '*',
  MODE === 'production'
    ? createRequestHandler({ build: require(BUILD_DIR) })
    : (...args) => {
        purgeRequireCache();
        const requestHandler = createRequestHandler({
          build: require(BUILD_DIR),
          mode: MODE,
        });
        return requestHandler(...args);
      },
);

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  // require the built app so we're ready when the first request comes in
  require(BUILD_DIR);
  console.log(`✅ app ready: http://localhost:${port}`);
});

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't const
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete require.cache[key];
    }
  }
}
