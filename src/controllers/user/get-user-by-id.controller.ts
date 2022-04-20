import { PrismaClient } from '@prisma/client';

import asyncHandler from '../../utils/asyncHandler';
import throwError from '../../utils/throw-error';

const { user } = new PrismaClient();

const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body as { id: string };
    const foundUser = await user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        schoolId: true,
        isVerified: true,
        isDeleted: true,
        createdAt: true,
        description: true,
        phone: true,
        teacherId: true,
      },
    });
    if (!foundUser) {
      res.status(404);
      return throwError('User not found');
    }
    return res.status(200).json({
      status: true,
      message: 'User found',
      data: foundUser,
    });
  } catch (err) {
    throw err;
  }
});

export default getUserById;
