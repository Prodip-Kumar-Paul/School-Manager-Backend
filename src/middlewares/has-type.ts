import { NextFunction, Response } from 'express';
import { Req } from '@/types/extended-types';
import userType from '@/types/user-type';
// import throwError from '../utils/throw-error';

const hasType = (requiredType: userType) => {
  return (req: Req, res: Response, next: NextFunction) => {
    try {
      const { type } = req;
      if (type !== requiredType) {
        return res.status(403).json({
          status: false,
          data: null,
          message: 'You do not have permission to perform this action!',
        });
        // return throwError('You do not have permission to perform this action');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default hasType;
