import { Router } from 'express';
const router = Router();
import passport from 'passport';

import { profile, update, signUp, signIn, destroySession, create, create_session } from '../controllers/users_controller.js';

router.get('/profile/:id',passport.checkAuthentication,profile);
router.post('/update/:id',passport.checkAuthentication,update);

router.get('/signup',signUp);
router.get('/signin',signIn);
router.get('/signout',destroySession);


router.post('/create',create);
router.post('/create-session',passport.authenticate(
    'local',
   { failureRedirect : 'signin'}
   ),create_session);


router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/users/signin'}),create_session);


export default router;