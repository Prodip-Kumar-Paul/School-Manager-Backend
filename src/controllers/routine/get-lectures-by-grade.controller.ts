import { PrismaClient } from '@prisma/client';

import School from '../../models/school.model';
import asyncHandler from '../../utils/asyncHandler';
import throwError from '../../utils/throw-error';

const { school } = new PrismaClient();

/**
 * @auth required
 * @route {POST} /lecture/get_lectures_by_grade
 * @body {grade: string, day?: string }
 * @returns {lectures for a particular grade}
 */

const getLecturesByGrade = asyncHandler(async (req, res) => {
  try {
    const { grade, day } = req.body as {
      grade: string;
      day?: string;
    };
    const { schoolId } = req;

    /**
     * @note -  if a day is provided, then we will return all the lectures for that day
     *          otherwise we will return all the lectures for that grade of a week.
     */
    const mode = day ? 'daily' : 'weekly';

    let foundData;

    if (mode === 'daily') {
      foundData = await school.findFirst({
        where: { id: schoolId },
        select: {
          grades: {
            where: { name: grade },
            select: {
              lectures: {
                where: { day },
                orderBy: { startTime: 'asc' },
              },
            },
          },
        },
      });
    } else {
      foundData = await school.findFirst({
        where: { id: schoolId },
        select: {
          grades: {
            where: { name: grade },
            select: {
              lectures: {
                orderBy: { startTime: 'asc' },
              },
            },
          },
        },
      });
    }

    /**
     * @description - {foundData} is of type school hence it'll have a property called grades
     *                which is an array of grades. As we are querying for a particular grade,
     *                we will take the first grade in the array that matches the grade name.
     *                Then we will take the lectures property of that grade and return.
     */
    const { lectures } = (foundData as School).grades[0];

    if (!lectures) {
      res.status(404);
      return throwError('No lectures found.');
    }

    return res
      .status(200)
      .json({ data: lectures, message: 'Lectures found.', status: true });
  } catch (err) {
    throw err;
  }
});

export default getLecturesByGrade;
