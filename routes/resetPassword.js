import { Router } from 'express';
import passport from 'passport';
const router = Router();


import { resetPasswordMail, resetPassword, create_password, passwordReset } from '../controllers/resetPassword_controller.js';

router.get('/reset-password-mail',resetPasswordMail);
router.post('/reset-password',resetPassword);

router.get('/resetPassword/:token',create_password);

router.post('/password_reset/:token',passwordReset);
export default router;