import { Request } from 'express';

export interface Req extends Request {
  id?: string;
  type?: string;
  schoolId?: string;
}
