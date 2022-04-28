import { PrismaClient } from '@prisma/client';

import Lecture from '../../models/lecture.model';
import asyncHandler from '../../utils/asyncHandler';
import throwError from '../../utils/throw-error';

const { lecture } = new PrismaClient();

/**
 * @auth required
 * @route {POST} /lecture/update_lecture_details
 * @body {subject: string, day: string, teacherId: string, startTime: date, endTime: date}
 * @returns {updated count}
 */

const updateLectureDetails = asyncHandler(async (req, res) => {
  try {
    const { id, subject, day, teacherId, startTime, endTime } =
      req.body as Lecture;
    const lectureDetails = {} as Partial<Lecture>;

    const isPresent = await lecture.findFirst({
      where: { id, isDeleted: false },
    });

    if (!isPresent) {
      res.status(404);
      return throwError('Lecture not found');
    }

    if (subject) {
      lectureDetails.subject = subject;
    }
    if (day) {
      lectureDetails.day = day.toLowerCase();
    }
    if (teacherId) {
      const foundTeacher = await lecture.findFirst({
        where: { id: teacherId },
      });
      if (!foundTeacher) {
        res.status(404);
        return throwError('Teacher not found');
      }
      lectureDetails.teacherId = teacherId;
    }
    if (startTime) {
      lectureDetails.startTime = startTime;
    }
    if (endTime) {
      lectureDetails.endTime = endTime;
    }

    const updatedLecture = await lecture.update({
      where: { id },
      data: lectureDetails,
    });

    if (!updatedLecture) {
      res.status(404);
      return throwError('No lectures found');
    }

    return res.status(200).json({
      message: 'successfully updated lecture',
      status: true,
      data: updatedLecture,
    });
  } catch (error) {
    throw error;
  }
});

export default updateLectureDetails;