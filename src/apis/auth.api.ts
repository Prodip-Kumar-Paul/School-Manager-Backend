import { Router } from 'express';
import { body } from 'express-validator';
import logInController from '../controllers/auth.controller';
import { errorHandler } from '../utils/errorHandler';
const router = Router();

/**
 * @description - Logs in a user
 */

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
  errorHandler,
  logInController,
);

export default router;
