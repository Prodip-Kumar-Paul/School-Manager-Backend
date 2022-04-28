import { PrismaClient } from '@prisma/client';

import asyncHandler from '../../utils/asyncHandler';

const { lecture } = new PrismaClient();

/**
 * @auth required
 * @route {POST} /routine/get_routine_by_teacher_id
 * @body {week: boolean, day: string}
 * @returns {teachers routine}
 */

const getLectureByTeacherId = asyncHandler(async (req, res) => {
  try {
    const { day } = req.query as unknown as {
      day: string;
    };

    const { id, schoolId, type } = req;

    let teacherId = id;

    /**
     * @logic - if principal or senior teachers want to see other teacher's routine
     */
    type
      ? 'PRINCIPAL' || 'SENIOR_TEACHER'
      : (teacherId = (req.query?.teacherId as string) || id);

    const body = {} as {
      day: string;
    };

    const possibleDays = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    /**
     * @note - if day is not provided, it will return all days or weekly routine
     */
    if (day && possibleDays.includes(day)) {
      body.day = day;
    }

    const foundLectures = await lecture.findMany({
      where: { schoolId, isDeleted: false, teacherId, ...body },
      include: {
        school: true,
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            description: true,
            phone: true,
          },
        },
        grade: true,
      },
    });

    res.status(200).json({
      message: 'Lectures found.',
      status: true,
      data: foundLectures,
    });
  } catch (err) {
    throw err;
  }
});

export default getLectureByTeacherId;
