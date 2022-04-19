import { Router } from 'express';
import { body } from 'express-validator';

import createNewUser from '../controllers/user/new-user.controller';
import validateType from '../middlewares/validators/validate-type';
import { errorHandler } from '../utils/errorHandler';

const router = Router();

/**
 * @description - These routes are used for user CRUD operations
 * @auth - required
 * @route {GET} /user
 * */

router.post(
  '/create_new_user',
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
  errorHandler,
  createNewUser,
);

export default router;
