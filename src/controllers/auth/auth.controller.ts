import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

import asyncHandler from '../../utils/asyncHandler';
import config from '../../config/config';
import throwError from '../../utils/throw-error';

const { user } = new PrismaClient();

/**
 * @description - This function is used to login a user or school_admin
 * @auth not required
 * @route {POST} /auth/login
 * @body {email: string, password: string}
 * @returns provide token and user details
 */

const logInController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body as Partial<User>;
    const foundUser = await user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) {
      res.status(404);
      return throwError('No user found with this email');
    }

    if (foundUser.isDeleted) {
      res.status(400);
      return throwError('User is not active');
    }

    if (!foundUser.isVerified) {
      res.status(400);
      return throwError('User is not verified');
    }

    const isEqual = await bcrypt.compare(password || '', foundUser.password);
    if (!isEqual) {
      res.status(400);
      return throwError('Password is incorrect');
    }

    const token = jwt.sign(
      {
        type: foundUser.type,
        id: foundUser.id,
        schoolId: foundUser.schoolId,
      },
      config.JWT_SECRET_KEY,
      { expiresIn: '7d' },
    );

    res.status(200).json({
      message: 'success',
      data: {
        user: {
          id: foundUser.id,
          email: foundUser.email,
          type: foundUser.type,
          schoolId: foundUser.schoolId,
          name: foundUser.name,
        },
        token,
      },
      status: true,
    });
  } catch (err) {
    throw err;
  }
});

export default logInController;
