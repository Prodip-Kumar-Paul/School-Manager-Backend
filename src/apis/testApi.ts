import { Router } from 'express';
import testServer from '../controllers/testController';
const router = Router();

//test api
router.get('/', testServer);

export default router;
