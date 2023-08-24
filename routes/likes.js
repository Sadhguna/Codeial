import { Router } from 'express';

const router = Router();
import { toggleLike } from '../controllers/likes_controller.js';


router.post('/toggle', toggleLike);


export default router;