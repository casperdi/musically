'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { login, user_post, user_put } = require('../controllers/authController');

router.post('/login', login);

router.post(
  '/register',
  body('username').isLength({ min: 3 }).escape(),
  body('email').isEmail(),
  body('password').matches('(?=.*[A-Z]).{8,}'),
  body('ppicture'),
  body('bio').isLength({max: 200}).escape(),
  user_post
);

router.put(
  '/edit',
  body('ppicture'),
  body('email').isEmail(),
  body('bio').isLength({max: 200}).escape(),
  user_put
)

module.exports = router;
