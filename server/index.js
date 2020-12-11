require('dotenv').config();
require('newrelic');
const express = require('express');
const morgan = require('morgan');

const { apiRoutes, webRoutes } = require('./routes');

const app = express();

// Serve static index.html file
app.use(express.static('client/dist'));

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

app.use('/', webRoutes);
app.use('/api', apiRoutes);

const port = process.env.PORT || 3004;
app.listen(port, () => { console.log(`The server is listening on port ${port}...`); });
