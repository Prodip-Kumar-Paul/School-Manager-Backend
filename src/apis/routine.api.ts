import { Router } from 'express';
import { body } from 'express-validator';

import updateLectureDetails from '../controllers/routine/update-lecture.controller';
import deleteLecture from '../controllers/routine/delete-lecture';
import createNewLecture from '../controllers/routine/new-lecture.controller';
import hasType from '../middlewares/has-type';
import isAuth from '../middlewares/is-auth';
import validationErrorHandler from '../middlewares/validation-error-handler';
import getLecturesByGrade from '../controllers/routine/get-lectures-by-grade.controller';

const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const router = Router();

/**
 * @description - These routes are used for routines CRUD operations
 * @auth - required
 * @route /routine
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
  hasType(['PRINCIPAL', 'SENIOR_TEACHER']),
  createNewLecture,
);

router.delete(
  '/delete_lecture',
  [body('lectureId').notEmpty()],
  validationErrorHandler,
  isAuth,
  hasType(['PRINCIPAL', 'SENIOR_TEACHER']),
  deleteLecture,
);

router.post(
  '/update_lecture_details',
  isAuth,
  hasType(['PRINCIPAL', 'SENIOR_TEACHER']),
  [body('id').notEmpty(), body('day').optional().isIn(DAYS)],
  validationErrorHandler,
  updateLectureDetails,
);

router.post(
  '/get_lectures_by_grade',
  isAuth,
  [
    body('grade').notEmpty().withMessage('Please provide a grade.'),
    body('day').optional().isIn(DAYS),
  ],
  getLecturesByGrade,
);

export default router;
