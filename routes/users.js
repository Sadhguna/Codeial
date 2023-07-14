const express = require('express');
const router = express.Router();

const Usercontroller = require('../controllers/users_controller');

router.get('/profile',Usercontroller.profile);
router.get('/signup',Usercontroller.signUp);
router.get('/signin',Usercontroller.signIn);


router.post('/create',Usercontroller.create);
router.post('/create-session',Usercontroller.create_session);

module.exports = router;