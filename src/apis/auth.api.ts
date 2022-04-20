import { Router } from 'express';
import { body } from 'express-validator';

import logInController from '../controllers/auth/auth.controller';
import verifySignupOTP from '../controllers/auth/signup-otp.controller';
import validationErrorHandler from '../middlewares/validation-error-handler';

const router = Router();

/**
 * @description - These routes are used for auth operations
 * @auth - not required
 * @route /auth
 * */

router.post(
  '/login',
  [
    body('email').notEmpty(),
    body('password')
      .isStrongPassword()
      .notEmpty()
      .withMessage(
        'password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter',
      ),
  ],
  validationErrorHandler,
  logInController,
);

router.post(
  '/verify_signup_otp',
  [body('id').notEmpty(), body('otp').notEmpty()],
  verifySignupOTP,
);

export default router;
