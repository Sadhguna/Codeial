import { Router } from 'express';
import passport from 'passport';
const router = Router();

import { friends } from '../controllers/friends_controller.js';

router.get('/:id',friends);
export default router;