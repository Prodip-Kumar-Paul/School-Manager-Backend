import {
  RequestHandler,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import { validationResult } from 'express-validator';
import config from '../config/config';
import MyError from '../types/error';

const errorHandler: RequestHandler = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        type: 0,
        message: 'invalid inputs',
        errors: errors.array().map(({ msg, param }) => {
          return {
            msg,
            param,
          };
        }),
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: 'server error',
    });
  }
};

// interface CustomErrorRequestHandler {
//   err: Error;
//   req: Request;
//   res: Response;
// }

const sendErrorDev = (err: MyError, req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    error: err,
    message: err.message,
    data: err.data,
    status: err.status,
    stack: err.stack,
  });
};

const sendErrorProd = (err: MyError, req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    message: err.message,
    data: err.data,
    status: err.status,
  });
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('Culprit lies here ..... ', err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || false;
  err.data = err.data || [];

  if (config.NODE_ENV === 'dev') {
    sendErrorDev(err, req, res);
  } else if (config.NODE_ENV === 'prod') {
    sendErrorProd(err, req, res);
  }
};

export { globalErrorHandler, errorHandler };
