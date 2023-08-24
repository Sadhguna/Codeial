import { Router } from 'express';
const router = Router();

import create_session from '../../../controllers/api/v1/users_api.js';

router.post('/create-session',create_session);

export default router;  