import { PrismaClient } from '@prisma/client';

import asyncHandler from '../../utils/asyncHandler';
import throwError from '../../utils/throw-error';

const { user } = new PrismaClient();

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const { schoolId } = req;
    const allUsers = await user.findMany({
      where: { schoolId },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        schoolId: true,
      },
    });

    if (!allUsers) {
      res.status(404);
      return throwError('No users found');
    }

    return res.status(200).json({
      message: 'success',
      status: true,
      data: allUsers,
    });
  } catch (err) {
    throw err;
  }
});

export default getAllUsers;
