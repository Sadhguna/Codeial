import { Router } from 'express';
const router = Router();


import posts from './posts.js';
import users from './users.js'
router.use('/posts',posts);
router.use('/users',users);

export default router;  