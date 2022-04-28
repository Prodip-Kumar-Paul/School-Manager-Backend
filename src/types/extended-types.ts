import { Request } from 'express';
import userType from './user-type';

export interface Req extends Request {
  id?: string;
  type?: userType;
  schoolId?: string;
}
