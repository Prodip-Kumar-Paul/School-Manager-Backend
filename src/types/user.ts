/**
 * @description - This interface contains User details from 'users' table more keys can be added later on
 */

export default interface User {
  email: string;
  password: string;
  schoolId: string;
  type: string;
}
