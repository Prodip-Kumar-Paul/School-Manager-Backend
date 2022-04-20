import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import User from '@/types/user-body-type';
import getSignupOtpTemplate from '../../templates/signup-otp';
import asyncHandler from '../../utils/asyncHandler';
import getOtp from '../../utils/get-otp';
import sendEmail from '../../utils/send-email';
import throwError from '../../utils/throw-error';

const { user } = new PrismaClient();

/**
 * @auth required
 * @route {POST} /user/create_new_user
 * @body {email: string, password: string, schoolId: string, type: string, name: string}
 * @returns {User}
 */

const createNewUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, schoolId, type, name } = req.body as User;
    const isPresent = await user.findUnique({
      where: { email },
    });

    if (isPresent) {
      res.status(400);
      return throwError('User already exists');
    }

    const { otp, otpExpiry } = getOtp();
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await user.create({
      data: {
        email,
        password: hashedPassword,
        schoolId,
        name,
        type,
        otp,
        otpExpiry,
      },
      select: { email: true, name: true, type: true, id: true },
    });

    if (!createdUser) {
      res.status(400);
      return throwError('User not created. Something went wrong');
    }

    const emailContent = getSignupOtpTemplate(otp);
    await sendEmail(createdUser.email, 'EMAIL VERIFICATION', emailContent);

    return res.status(200).json({
      message: 'User created successfully. Please verify your email',
      status: true,
      data: createdUser,
    });
  } catch (err) {
    throw err;
  }
});

export default createNewUser;
