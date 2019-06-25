import * as express from 'express';
import * as bodyParser from 'body-parser';
import logger = require('morgan');
import Routes from '../index.route';
import config = require('./config');
import cookieParser = require('cookie-parser');
import passport = require('passport');
import helmet = require('helmet');
import cors = require('cors');

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    if (config.env === 'development') {
      this.express.use(logger('dev'));
    }

    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));

    this.express.use(passport.initialize());
    this.express.use(passport.session());

    this.express.use(cookieParser());
    // secure apps by setting various HTTP headers
    this.express.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    this.express.use(cors());
  }

  private routes(): void {
    this.express.get('/', (req, res, next) => {
      res.send('Typescript App works!!');
    });

    // user route
    this.express.use('/api/v1', Routes);

    // handle undefined routes
    this.express.use('*', (req, res, next) => {
      res.send('Make sure url is correct!!!');
    });
  }
}

export default new App().express;
