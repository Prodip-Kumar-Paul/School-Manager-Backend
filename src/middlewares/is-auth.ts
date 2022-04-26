import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import { TokenType } from '@/types/authType';
import { Req } from '@/types/extended-types';
import throwError from '../utils/throw-error';
import userType from '@/types/user-type';

const isAuth = (req: Req, res: Response, next: NextFunction) => {
  try {
    const authToken = req.get('Authorization');

    if (!authToken) {
      res.status(401);
      return throwError('No authentication token attached');
    }

    const token: string = authToken.split(' ')[1];
    const { exp } = jwt.decode(token) as JwtPayload;
    if (exp && Date.now() >= exp * 1000) {
      res.status(401);
      return throwError('Token expired');
    }

    const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY) as TokenType;

    if (!decodedToken) {
      res.status(401);
      return throwError('Not authenticated');
    }

    const { id, type, schoolId } = decodedToken;

    req.id = id;
    req.type = type as userType;
    req.schoolId = schoolId;

    next();
  } catch (err) {
    res.status(401).json({
      status: false,
      data: null,
      message: (err as Error).message,
    });
    // next(err);
  }
};

export default isAuth;
