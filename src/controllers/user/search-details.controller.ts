import { PrismaClient } from '@prisma/client';

import asyncHandler from '../../utils/asyncHandler';

const { user } = new PrismaClient();

/**
 * @auth required
 * @route {POST} /user/search_details
 * @body {keyword: string}
 * @returns {updated count}
 */

const searchDetails = asyncHandler(async (req, res) => {
  try {
    const { searchKey } = req.query as { searchKey: string };

    const searchResult = await user.findMany({
      where: {
        AND: [
          { isDeleted: false, isVerified: true },
          {
            OR: [
              {
                email: { contains: searchKey, mode: 'insensitive' },
              },
              {
                name: { contains: searchKey, mode: 'insensitive' },
              },
              {
                type: { contains: searchKey, mode: 'insensitive' },
              },
              {
                teacherId: { contains: searchKey, mode: 'insensitive' },
              },
              {
                phone: { contains: searchKey, mode: 'insensitive' },
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        email: true,
        description: true,
        name: true,
        type: true,
        phone: true,
        teacherId: true,
        school: { select: { id: true, name: true } },
        isVerified: true,
        isDeleted: true,
        createdAt: true,
      },
      orderBy: {
        teacherId: 'asc',
      },
      take: 5,
    });

    return res.status(200).json({
      message: 'success',
      status: true,
      data: searchResult,
    });
  } catch (err) {
    throw err;
  }
});

export default searchDetails;
