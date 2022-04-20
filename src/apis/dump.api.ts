import { Router } from 'express';

import insertUsers from '../controllers/dump/user.controller';
import insertSchools from '../controllers/dump/school.controller';

const router = Router();

/**
 * @description - These routes are dump routes whic are used to create dump data
 * @auth - not required
 * @route {GET} /dump
 * */

router.get('/user', insertUsers);
router.get('/school', insertSchools);

export default router;
