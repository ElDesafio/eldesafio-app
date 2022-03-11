require('newrelic');

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const { createRequestHandler } = require('@remix-run/express');

import * as serverBuild from '@remix-run/dev/server-build';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

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
    getLoadContext(req, res) {
      // this becomes the loader context
      return { socket };
    },
  }),
);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
