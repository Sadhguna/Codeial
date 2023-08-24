import { Router } from 'express';
const router = Router();
import file from './v1/index.js';
router.use('/v1',file);

export default router;  