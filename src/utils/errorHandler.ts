import {
  RequestHandler,
  ErrorRequestHandler,
  Request,
  Response,
} from 'express';
import { ValidationError, validationResult } from 'express-validator';
import config from '../config/config';
import { CustomError } from '../types/error';

const errorHandler: RequestHandler = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(200).json({
        type: 0,
        message: 'invalid inputs',
        errors: errors.array().map(({ msg, param }: ValidationError) => ({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          msg,
          param,
        })),
      });
    } else {
      next();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({
      status: false,
      message: 'server error',
    });
  }
};

const sendErrorDev = (err: CustomError, req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    error: err,
    message: err.message,
    data: err.data,
    status: err.status,
    stack: err.stack,
  });
};

const sendErrorProd = (err: CustomError, req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    message: err.message,
    data: err.data,
    status: err.status,
  });
};

const globalErrorHandler: ErrorRequestHandler = (
  err: CustomError,
  req,
  res,
) => {
  // eslint-disable-next-line no-console
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
