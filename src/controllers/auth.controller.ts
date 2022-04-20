import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

import asyncHandler from '../utils/asyncHandler';
import config from '../config/config';

const { user } = new PrismaClient();

/**
 * @description - This function is used to login a user or school_admin
 * @auth not required
 * @route {POST} /auth/login
 * @body {email: string, password: string}
 * @returns provide token and user details
 */

const logInController = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body as Partial<User>;
    const foundUser = await user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) {
      return res.status(404).json({
        message: 'No user found with this email',
        data: null,
        status: false,
      });
    }

    if (foundUser.isDeleted) {
      return res.status(400).json({
        message: 'User is not active',
        data: null,
        status: false,
      });
    }

    if (!foundUser.isVerified) {
      return res.status(400).json({
        message: 'User is not verified',
        data: null,
        status: false,
      });
    }

    const isEqual = await bcrypt.compare(password!, foundUser.password);
    if (!isEqual) {
      /**
       * TODO => need to do something better than this
       */
      return res.status(400).json({
        message: 'Wrong Password',
        data: null,
        status: false,
      });
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
    next(err);
  }
});

export default logInController;
