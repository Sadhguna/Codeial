import { Router } from 'express';

 
const router = Router();

import { home } from '../controllers/home_controller.js';
router.get('/',home);

import usersRouter from './users.js';
import postsRouter from './posts.js';
import CommentsRouter from './comments.js';
import apiRouter from './api/index.js';
import likesRouter from './likes.js';
import friendsRouter from './friends.js';
import resetpasswordRouter from './resetPassword.js';
import chatRouter from './chat.js';

router.use('/chat',chatRouter);
router.use('/users',usersRouter);
router.use('/posts',postsRouter);
router.use('/comments',CommentsRouter);
router.use('/api',apiRouter);
router.use('/likes',likesRouter);
router.use('/friends',friendsRouter);
router.use('/passwordreset',resetpasswordRouter);
//console.log("router accessed");
export default router;  