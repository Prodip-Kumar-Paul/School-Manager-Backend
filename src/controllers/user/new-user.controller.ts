import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import User from '@/types/user';
import getSignupOtpTemplate from '../../templates/signup-otp';
import asyncHandler from '../../utils/asyncHandler';
import getOtp from '../../utils/get-otp';
import sendEmail from '../../utils/send-email';

const { user } = new PrismaClient();

/**
 * @auth required
 * @route {POST} /user/create_new_user
 * @body {email: string, password: string, schoolId: string, type: string, name: string}
 * @returns {User}
 */

const createNewUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, schoolId, type, name } = req.body as User;
    const isPresent = await user.findUnique({
      where: { email },
    });

    if (isPresent) {
      return res.status(200).json({
        message: 'User already present',
        data: isPresent,
        status: false,
      });
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
      select: { email: true, name: true, type: true },
    });

    if (!createdUser) {
      return res.status(400).json({
        message: 'User not created. Something went wrong',
        status: false,
        data: null,
      });
    }

    const emailContent = getSignupOtpTemplate(otp);
    await sendEmail(createdUser.email, 'EMAIL VERIFICATION', emailContent);

    return res.status(200).json({
      message: 'User created successfully. Please verify your email',
      status: true,
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
});

export default createNewUser;
