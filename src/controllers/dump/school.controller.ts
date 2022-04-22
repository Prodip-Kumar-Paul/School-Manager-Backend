import { PrismaClient } from '@prisma/client';

import schools from '../../data/schools';
import asyncHandler from '../../utils/asyncHandler';

const { school } = new PrismaClient();

/**
 * @description - This function is used to create dump school data
 * @auth not required
 * @route {GET} /dump/school
 */

const insertSchools = asyncHandler(async (req, res, next) => {
  try {
    const { count } = await school.createMany({
      data: schools,
    });

    if (count) {
      res.status(201).json({
        status: true,
        message: `${count} schools inserted successfully`,
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

export default insertSchools;
