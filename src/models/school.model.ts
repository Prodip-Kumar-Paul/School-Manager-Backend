import { Lecture } from '@prisma/client';
import Grade from './grade.model';
import User from './user.model';

export default interface School {
  id: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  users: User[];
  grades: Grade[];
  Lecture: Lecture[];
}
