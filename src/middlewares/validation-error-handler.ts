import { NextFunction, Response } from 'express';

import { Req } from '@/types/extended-types';
import { ValidationError, validationResult } from 'express-validator';

const validationErrorHandler = (
  req: Req,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: false,
        data: null,
        message: 'Invalid Inputs',
        error: errors.array().map(({ msg, param }: ValidationError) => ({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          msg,
          param,
        })),
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

export default validationErrorHandler;
