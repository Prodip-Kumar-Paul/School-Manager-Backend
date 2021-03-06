/**
 * @description - This interface contains User details from 'users' table more keys can be added later on
 */

export default interface User {
  name: string;
  email: string;
  password: string;
  schoolId: string;
  type: string;
  teacherId: string;
  phone: string;
  description: string;
  isActive: boolean;
}
