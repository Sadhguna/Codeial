const express = require('express');
const passport = require('passport');
const router = express.Router();


const passwordController = require('../controllers/resetPassword_controller');

router.get('/reset-password-mail',passwordController.resetPasswordMail);
router.post('/reset-password',passwordController.resetPassword);

router.get('/resetPassword/:token',passwordController.create_password);

router.post('/password_reset/:token',passwordController.passwordReset);
module.exports = router;