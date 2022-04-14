import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import asyncHandler from '../utils/asyncHandler';
import config from '../config/config';

const { user } = new PrismaClient();

/**
 * @description - This function is used to login a user or school_admin
 * @auth no
 * @route {GET} /user/login
 * @body {email: string, password: string}
 * @returns token and user details
 */

const logInController = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const findUser = await user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) {
      return res.status(200).json({
        message: 'Invalid email or password',
        data: findUser,
        status: false,
      });
    }

    const isEqual = await bcrypt.compare(password, findUser.password);
    if (!isEqual) {
      /**
       * TODO => need to do something better than this
       */

      // const error = new Error('Wrong Password');
      // error.statusCode = 200;
      // throw error;
      // return next(new Error('Wrong Password'));
      return res.status(200).json({
        message: 'Wrong Password',
        data: findUser,
        status: false,
      });
    }

    const token = jwt.sign(
      {
        type: 'SCHOOL_ADMIN',
        id: findUser.id.toString(),
        email: findUser.email,
      },
      config.JWT_SECRET_KEY,
      { expiresIn: '2d' },
    );
    res.status(200).json({
      message: 'success',
      data: { findUser, token },
      status: true,
    });
  } catch (err) {
    next(err);
  }
});

export default logInController;
