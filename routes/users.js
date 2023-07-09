const express = require('express');
const router = express.Router();

const Usercontroller = require('../controllers/users_controller');

router.get('/profile',Usercontroller.profile);

module.exports = router;