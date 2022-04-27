import { PrismaClient } from '@prisma/client';

import asyncHandler from '../../utils/asyncHandler';
import throwError from '../../utils/throw-error';

const { lecture } = new PrismaClient();

/**
 * @auth required
 * @route {POST} /routine/delete_lecture
 * @body {lectureId: string}
 * @returns {deleted lecture}
 */

const deleteLecture = asyncHandler(async (req, res) => {
  try {
    const { lectureId } = req.body as { lectureId: string };

    const isPresent = await lecture.findUnique({
      where: { id: lectureId },
    });
    if (!isPresent) {
      res.status(200);
      return throwError('Lecture not found');
    }
    const deletedLecture = await lecture.delete({
      where: { id: lectureId },
    });

    res.status(200).json({
      message: 'Lecture deleted successfully.',
      status: true,
      data: deletedLecture,
    });
  } catch (err) {
    throw err;
  }
});

export default deleteLecture;
