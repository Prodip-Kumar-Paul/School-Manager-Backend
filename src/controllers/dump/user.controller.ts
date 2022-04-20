import { PrismaClient } from '@prisma/client';

import users from '../../data/users';
import asyncHandler from '../../utils/asyncHandler';

const { user } = new PrismaClient();

/**
 * @description - This function is used to create dump user data
 * @auth not required
 * @route {GET} /dump/user
 */

const insertUsers = asyncHandler(async (req, res, next) => {
  try {
    const { count } = await user.createMany({
      data: users,
    });

    if (count) {
      res.status(201).json({
        status: true,
        message: `${count} users inserted successfully`,
        data: [],
      });
    } else {
      res.status(400).json({
        status: false,
        message: 'Something went wrong',
        data: [],
      });
    }
  } catch (err) {
    next(err);
  }
});

export default insertUsers;
