import { Router } from 'express';
import { body } from 'express-validator';

import deleteLecture from '../controllers/routine/delete-lecture';
import getLectureByTeacherId from '../controllers/routine/get-lectures-by-teacher-id';
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
    body('day')
      .isIn([
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ])
      .withMessage('Please provide a valid day i.e. Monday to sunday'),
    body('startTime').notEmpty(),
    body('endTime').notEmpty(),
  ],
  validationErrorHandler,
  isAuth,
  hasType(['PRINCIPAL', 'SENIOR_TEACHER']),
  createNewLecture,
);

router.get(
  '/get_routine_by_teacher_id',
  validationErrorHandler,
  isAuth,
  hasType(['PRINCIPAL', 'SENIOR_TEACHER']),
  getLectureByTeacherId,
);

router.delete(
  '/delete_lecture',
  [body('lectureId').notEmpty()],
  validationErrorHandler,
  isAuth,
  hasType(['PRINCIPAL', 'SENIOR_TEACHER']),
  deleteLecture,
);

export default router;
