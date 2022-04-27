import { Router } from 'express';
import { body } from 'express-validator';
import createNewLecture from '../controllers/routine/new-lecture.controller';
import hasType from '../middlewares/has-type';
import isAuth from '../middlewares/is-auth';
import validationErrorHandler from '../middlewares/validation-error-handler';

const router = Router();

/**
 * @description - These routes are used for routines CRUD operations
 * @auth - required
 * @route /routine
 *
 * */

router.post(
  '/create_new_lecture',
  [
    body('name').notEmpty(),
    body('subject').notEmpty(),
    body('day').notEmpty(),
    body('startTime').notEmpty(),
    body('endTime').notEmpty(),
  ],
  validationErrorHandler,
  isAuth,
  hasType(['PRINCIPAL']),
  createNewLecture,
);

export default router;
