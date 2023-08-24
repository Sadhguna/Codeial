import { Router } from 'express';
import passport from 'passport';
const router = Router();

import { create, destroy } from '../controllers/comments_controller.js';

router.post('/create',passport.checkAuthentication,create);
router.get('/destroy/:id',passport.checkAuthentication,destroy);

export default router;