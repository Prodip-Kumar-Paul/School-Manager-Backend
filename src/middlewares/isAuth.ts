import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config.js';
import { ErrorType } from '@/types/error.js';
import { CustomReq, TokenType } from '@/types/authType.js';

export const isAuthenticated: RequestHandler = (req: CustomReq, res, next) => {
  try {
    const authToken = req.get('Authorization');
    //  console.log(authToken);
    if (!authToken) {
      const error: ErrorType = {
        error: new Error('No authentication token attached'),
      };
      error.statusCode = 401;
      throw error;
    }

    const token: string = authToken.split(' ')[1];
    const { exp } = jwt.decode(token) as JwtPayload;
    if (exp && Date.now() >= exp * 1000) {
      const error: ErrorType = { error: new Error('Token Expired') };
      error.statusCode = 401;
      throw error;
    }

    const decodedToken: TokenType = {
      token: jwt.verify(token, config.JWT_SECRET_KEY),
    };
    if (!decodedToken) {
      const error: ErrorType = { error: new Error('Not authenticated') };
      error.statusCode = 401;
      throw error;
    }
    // console.log(decodedToken);

    req.id = decodedToken.id;
    req.userType = decodedToken.userType;

    next();
  } catch (err) {
    next(err);
  }
};

export const isAuthenticatedAndAdmin: RequestHandler = (
  req: CustomReq,
  res,
  next,
) => {
  try {
    const authToken = req.get('Authorization');

    if (!authToken) {
      const error: ErrorType = {
        error: new Error('No authentication token attached'),
      };
      error.statusCode = 401;
      throw error;
    }

    const token = authToken.split(' ')[1];

    const { exp } = jwt.decode(token) as JwtPayload;
    if (exp && Date.now() >= exp * 1000) {
      const error: ErrorType = { error: new Error('Token Expired') };
      error.statusCode = 401;
      throw error;
    }

    const decodedToken: TokenType = {
      token: jwt.verify(token, config.JWT_SECRET_KEY),
    };
    if (!decodedToken) {
      const error: ErrorType = { error: new Error('Not authenticated') };
      error.statusCode = 401;
      throw error;
    }

    // console.log(decodedToken);
    if (decodedToken.userType !== 'Admin') {
      const error: ErrorType = { error: new Error('Unauthorized') };
      error.statusCode = 401;
      throw error;
    }

    req.id = decodedToken.id;
    req.userType = decodedToken.userType;

    next();
  } catch (err) {
    next(err);
  }
};
