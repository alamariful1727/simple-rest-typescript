import App from './config/express';
import mongoose = require('mongoose');
import config = require('./config/config');

// make bluebird default Promise
Promise = require('bluebird');

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.local;
mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// start server
App.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`);
});

module.exports = App;
