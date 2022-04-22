import { ErrorRequestHandler } from 'express';

import config from '../config/config';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  // eslint-disable-next-line no-console
  console.log('Culprit lies here ..... ', err);

  if (!res.status) {
    res.status(500);
  }

  if (config.NODE_ENV === 'dev') {
    res.json({
      error: [err as Error],
      message: (err as Error).message,
      data: null,
      status: false,
    });
  } else if (config.NODE_ENV === 'prod') {
    res.json({
      message: (err as Error).message,
      data: null,
      status: false,
    });
  }
};

export default errorHandler;
