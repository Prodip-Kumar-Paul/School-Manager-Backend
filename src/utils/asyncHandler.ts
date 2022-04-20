import { Req } from '@/types/extended-types';
import { Response, NextFunction } from 'express';

import config from '../config/config';

type AsyncFunction = (
  req: Req,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export default (execution: AsyncFunction) =>
  (req: Req, res: Response, next: NextFunction) => {
    execution(req, res, next).catch((err) => {
      // eslint-disable-next-line no-console
      console.log('Culprit lies here ..... ', err);

      if (!res.status) {
        res.status(500);
      }

      /**
       * @ref https://stackoverflow.com/questions/39529870/ifprocess-env-node-env-production-always-false
       */

      if (config.NODE_ENV === 'dev ') {
        res.json({
          error: [
            {
              message: (err as Error).message,
              stack: (err as Error).stack,
            },
          ],
          message: (err as Error).message,
          data: null,
          status: false,
        });
      } else if (config.NODE_ENV === 'prod ') {
        res.json({
          message: (err as Error).message,
          data: null,
          status: false,
        });
      }

      /**
       * @TODO - use express error handler
       */

      // console.log(typeof err.e);
      // const error = err as Error;
      // next({error: error.message, stack: error.stack});
    });
  };
