import { Router } from 'express';
import passport from 'passport';
const router = Router();

import {store} from '../controllers/chat_controller.js';

 router.post('/store',passport.checkAuthentication,store);

export default router;