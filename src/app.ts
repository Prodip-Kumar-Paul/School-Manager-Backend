import express, { RequestHandler } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
// import xss from 'xss-clean';
import hpp from 'hpp';
import path from 'node:path';

import { globalErrorHandler } from './utils/errorHandler';

import testApis from './apis/testApi';

//app  and middleware
const app = express();
app.use(cors());

app.use(helmet());
app.use(
  express.static(path.join(__dirname, 'public'), {
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now().toString());
    },
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data sanitization against SQL query injection
/**
 * TODO => find some npm pkg
 */

// Data sanitization against XSS
/**
 * ? Type declaration need
 */
// app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use(compression());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use(limiter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use('/api/v1/test', testApis);

// EROOR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

// 404 MIDDLEWARE
app.use((req, res, next) => {
  res.status(404).json({
    message: 'resourse not found',
  });
});

export default app;
