import { Router } from 'express';
import testServer from '../controllers/test.controller';
const router = Router();

//test api
router.get('/', testServer);

export default router;
