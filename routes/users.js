const express = require('express');
const router = express.Router();
const passport = require('passport');

const Usercontroller = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,Usercontroller.profile);
router.post('/update/:id',passport.checkAuthentication,Usercontroller.update);

router.get('/signup',Usercontroller.signUp);
router.get('/signin',Usercontroller.signIn);
router.get('/signout',Usercontroller.destroySession);


router.post('/create',Usercontroller.create);
router.post('/create-session',passport.authenticate(
    'local',
   { failureRedirect : 'signin'}
   ),Usercontroller.create_session);


router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/usre/signin'}),Usercontroller.create_session);


router.get('/reset-password-mail',Usercontroller.resetPasswordMail);
router.post('/reset-password',Usercontroller.resetPassword);

router.get('/resetPassword/:token',Usercontroller.create_password);

router.post('/resetPassword/password_reset/:token',Usercontroller.passwordReset);

module.exports = router;