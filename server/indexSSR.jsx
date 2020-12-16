require('dotenv').config();
/* eslint-disable import/first */
import 'regenerator-runtime/runtime';
import express from 'express';
import morgan from 'morgan';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { apiRoutes, webRoutes } from './routes';

import App from '../client/src/components/App';
import 'newrelic';

const app = express();

app.get('/', (req, res) => {
  const reactHTML = ReactDOMServer.renderToString(<App />);
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>FEC Customer Reviews</title>
      <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>
      <div id="ReviewsService">${reactHTML}</div>
      <div id="reviewsPortal"></div>
    </body>
  </html>`;
  res.send(html);
});

// Serve static index.html file
app.use(express.static('client/dist')); // check this path too

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

app.use('/', webRoutes);
app.use('/api', apiRoutes);

const port = process.env.PORT || 3004;
app.listen(port, () => { console.log(`The server is listening on port ${port}...`); });
