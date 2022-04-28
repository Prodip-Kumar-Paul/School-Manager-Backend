import Lecture from './lecture.model';
import School from './school.model';

export default interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: string;
  school: School[];
  schoolId: string;
  description: string;
  teacherId: string;
  phone: string;
  isActive: boolean;
  otp?: string;
  otpExpiry?: Date;
  isVerified: boolean;
  Lecture: Lecture[];
  isDeleted: boolean;
}
