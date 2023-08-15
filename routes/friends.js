const express = require('express');
const passport = require('passport');
const router = express.Router();

const friendsController = require('../controllers/friends_controller');

router.get('/:id',friendsController.friends);
module.exports = router;