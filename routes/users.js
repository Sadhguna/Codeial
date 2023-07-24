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

module.exports = router;