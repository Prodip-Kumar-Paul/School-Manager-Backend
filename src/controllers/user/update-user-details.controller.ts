import { PrismaClient } from '@prisma/client';

import User from '@/types/user-body-type';
import asyncHandler from '../../utils/asyncHandler';
import throwError from '../../utils/throw-error';

const { user } = new PrismaClient();

/**
 * @auth required
 * @route {POST} /user/update_user_details
 * @body {name: string, description: string, phone: string, status: string}
 * @returns {updated count}
 */

const updateUserDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, phone, status } = req.body as User;
    const { id } = req.body as { id: string };

    const body = {} as User;

    if (name) {
      body.name = name;
    }
    if (description) {
      body.description = description;
    }
    if (phone) {
      body.phone = phone;
    }
    if (status) {
      if (status.trim() === 'active' || status.trim() === 'inactive') {
        body.status = status.trim().toUpperCase();
      } else {
        res.status(200);
        return throwError('Invalid status');
      }
    }

    const updatedUser = await user.updateMany({
      where: { id },
      data: body,
    });

    if (updatedUser.count === 0) {
      res.status(404);
      return throwError('No users found');
    }

    return res.status(200).json({
      message: 'success',
      status: true,
      data: updatedUser,
    });
  } catch (err) {
    throw err;
  }
});

export default updateUserDetails;
