import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface TokenType {
  token?: string | JwtPayload;
  id?: string;
  userType?: string;
}

export interface CustomReq extends Request {
  id?: string;
  userType?: string;
}
