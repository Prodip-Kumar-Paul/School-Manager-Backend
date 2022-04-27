import { Router } from 'express';
import { body } from 'express-validator';
import updateLectureDetails from '../controllers/routine/update-lecture.controller';

import hasType from '../middlewares/has-type';
import isAuth from '../middlewares/is-auth';
import validationErrorHandler from '../middlewares/validation-error-handler';

const router = Router();

/**
 * @description - These routes are used for routines CRUD operations
 * @auth - required
 * @route /routine
 * */

router.post(
  '/update_lecture_details',
  isAuth,
  hasType(['PRINCIPAL', 'SENIOR_TEACHER']),
  [body('lecture_id').not().isEmpty()],
  validationErrorHandler,
  updateLectureDetails,
);

export default router;
