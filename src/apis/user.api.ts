import { Router } from 'express';
import { body, query } from 'express-validator';

import getAllUsers from '../controllers/user/get-all-users.controller';
import getUserById from '../controllers/user/get-user-by-id.controller';
import createNewUser from '../controllers/user/new-user.controller';
import searchDetails from '../controllers/user/search-details.controller';
import updateUserDetails from '../controllers/user/update-user-details.controller';
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

router.post(
  '/get_user_by_id',
  isAuth,
  hasType('PRINCIPAL'),
  [body('id').notEmpty()],
  validationErrorHandler,
  getUserById,
);

router.post(
  '/update_user_details',
  [body('id').notEmpty()],
  validationErrorHandler,
  isAuth,
  hasType('PRINCIPAL'),
  updateUserDetails,
);

// not used yet
router.get(
  '/search_details',
  [query('searchKey').notEmpty()],
  validationErrorHandler,
  isAuth,
  hasType('PRINCIPAL'),
  searchDetails,
);

export default router;
