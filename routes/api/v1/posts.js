import { Router } from 'express';
const router = Router();
import passport from 'passport';

import postApi from '../../../controllers/api/v1/posts_api.js';

router.get('/', postApi.index);
router.delete('/:id',passport.authenticate('jwt',{session : false}),postApi.destroy);

export default router;  