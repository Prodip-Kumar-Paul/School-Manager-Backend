import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler';

const { user } = new PrismaClient();

/**
 * Testing prisma db
 * @auth no
 * @route {GET} /test
 * @param none
 * @returns users present in db and count of users
 */

const testServer = asyncHandler(async (req, res, next) => {
  try {
    const newUsers = await user.createMany({
      data: [
        {
          email: 'prodip@test.com',
        },
        {
          email: 'bijoy@test.com',
        },
        {
          email: 'aditya@test.com',
        },
        {
          email: 'aritra@test.com',
        },
      ],
    });

    const existingUser = await user.findMany();

    res.status(200).json({
      status: true,
      message: 'Hello from test server',
      data: { newUsers, existingUser },
    });
  } catch (err) {
    next(err);
  }
});

export default testServer;
