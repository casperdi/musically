'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { login, user_post, user_edit } = require('../controllers/authController');
const { user_get } = require('../controllers/userController');

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

/* router.put(
  '/edit', 
  body('ppicture'),
  body('email').isEmail(),
  body('bio').isLength({max: 200}).escape(),
  user_edit
) */

router
  .route('/edit/:id')
  .get(user_get)
  .put(
    body('ppicture'),
    body('email').isEmail(),
    body('bio').isLength({max: 200}).escape(),
    user_edit
  
  );


module.exports = router;
