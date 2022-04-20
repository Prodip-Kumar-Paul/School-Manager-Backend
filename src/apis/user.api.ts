import { Router } from 'express';
import { body } from 'express-validator';

import getAllUsers from '../controllers/user/get-all-users.controller';
import createNewUser from '../controllers/user/new-user.controller';
import hasType from '../middlewares/has-type';
import isAuth from '../middlewares/is-auth';
import validationErrorHandler from '../middlewares/validation-error-handler';
import validateType from '../middlewares/validators/validate-type';

const router = Router();

/**
 * @description - These routes are used for user CRUD operations
 * @auth - required
 * @route /user
 * */

router.post(
  '/create_new_user',
  isAuth,
  hasType('PRINCIPAL'),
  [
    body('email').notEmpty().isEmail(),
    body('password')
      .notEmpty()
      .isStrongPassword()
      .withMessage(
        'password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter',
      ),
    body('schoolId')
      .notEmpty()
      .withMessage('A user must be associated with a school'),
    body('type')
      .notEmpty()
      .custom(validateType)
      .withMessage('Invalid user type'),
    body('name').notEmpty().withMessage('Please specify the user name'),
  ],
  validationErrorHandler,
  createNewUser,
);

router.get('/get_all_users', isAuth, hasType('PRINCIPAL'), getAllUsers);

export default router;
