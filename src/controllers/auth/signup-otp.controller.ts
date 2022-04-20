import { PrismaClient } from '@prisma/client';

import asyncHandler from '../../utils/asyncHandler';
import throwError from '../../utils/throw-error';
import verifyOTP from '../../utils/verify-otp';

const { user } = new PrismaClient();

const verifySignupOTP = asyncHandler(async (req, res) => {
  try {
    const { otp, id } = req.body as { id: string; otp: string };

    const foundUser = await user.findUnique({
      where: { id },
      select: { otp: true, otpExpiry: true, isDeleted: true },
    });

    if (!foundUser || foundUser.isDeleted) {
      res.status(404);
      return throwError('User not found');
    }

    if (!foundUser.otp || !foundUser.otpExpiry) {
      res.status(400);
      return throwError('OTP not found');
    }

    const { isValid, message } = verifyOTP(
      otp,
      foundUser.otp,
      foundUser.otpExpiry,
    );

    if (!isValid) {
      res.status(400);
      return throwError(message);
    }

    const updatedUser = await user.update({
      where: { id },
      data: {
        otp: null,
        otpExpiry: null,
        isVerified: true,
      },
    });

    if (!updatedUser) {
      res.status(400);
      return throwError('Something went wrong');
    }

    return res.status(200).json({
      message: 'Email verified successfully',
      status: true,
      data: null,
    });
  } catch (err) {
    throw err;
  }
});

export default verifySignupOTP;
