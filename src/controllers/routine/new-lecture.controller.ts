import { PrismaClient } from '@prisma/client';
import Grade from '../../models/grade.model';
import Lecture from '../../models/lecture.model';

import asyncHandler from '../../utils/asyncHandler';
import throwError from '../../utils/throw-error';

const { grade } = new PrismaClient();

/**
 * @auth required
 * @route {POST} /routine/create_new_lecture
 * @body {name: string, subject: string, day: string, startTime: Date, endTime: Date}
 * @returns {new lecture}
 */

const createNewLecture = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body as Grade;
    const { subject, day, startTime, endTime } = req.body as Lecture;

    const isPresent = await grade.findFirst({
      where: { name, isDeleted: false },
    });
    if (isPresent) {
      res.status(400);
      return throwError('Grade name already exists');
    }
    const newLecture = await grade.create({
      data: {
        name: name,
        schoolId: req.schoolId || '',
        lectures: {
          create: [
            {
              subject,
              day,
              startTime,
              endTime,
              schoolId: req.schoolId || '',
              teacherId: req.id || '',
            },
          ],
        },
      },
      include: {
        lectures: true,
      },
    });

    res.status(200).json({
      message: 'Lecture created successfully.',
      status: true,
      data: newLecture,
    });
  } catch (err) {
    throw err;
  }
});

export default createNewLecture;
