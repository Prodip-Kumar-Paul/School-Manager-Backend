import { NextFunction, Response } from 'express';
import { Req } from '@/types/extended-types';
import userType from '@/types/user-type';

const hasType = (requiredType: userType[]) => {
  return (req: Req, res: Response, next: NextFunction) => {
    try {
      const { type } = req;
      if (!type) {
        return res.status(403).json({
          status: false,
          data: null,
          message: 'Not authenticated',
        });
      }
      if (!requiredType.includes(type)) {
        return res.status(403).json({
          status: false,
          data: null,
          message: 'You do not have permission to perform this action!',
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default hasType;
