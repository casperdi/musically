'use strict';
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { addUser, modifyUser } = require('../models/userModel');
const { httpError } = require('../utils/errors');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

const login = (req, res, next) => {
  // TODO: add passport authenticate
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('login info', err, user, info);
    if (err || !user) {
      next(httpError('Invalid username/password', 400));
      return;
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        next(httpError('Login error', 400));
        return;
      }
      delete user.password;
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
};

const user_post = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('user_post validation', errors.array());
    next(httpError('invalid data :)', 400));
    return;
  }

  try {
    console.log('lomakkeesta', req.body);
    const { username, email, password, ppicture, bio } = req.body;
    // hash password
    const hash = bcrypt.hashSync(password, salt);
    const tulos = await addUser(username, email, hash, ppicture, bio, next);
    if (tulos.affectedRows > 0) {
      res.json({
        message: 'user added',
        user_id: tulos.insertId,
      });
    } else {
      next(httpError('No user inserted', 400));
    }
  } catch (e) {
    console.log('user_post error', e.message);
    next(httpError('internal server error', 500));
  }
};

const user_edit = async (req, res, next) => {
  console.log('user_edit', req.body, req.params);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('user_edit validation', errors.array());
    next(httpError('invalid data', 400));
    return;
  }
  // pvm VVVV-KK-PP esim 2010-05-28
  try {
    const {email, ppicture, bio } = req.body;
    /*let owner = req.user.user_id;
    if (req.user.role === 0) {
      owner = req.body.owner;
    }*/
console.log(email, ppicture, bio, req.params.user_id,)
    const tulos = await modifyUser(
      req.params.id,
      email,
      ppicture,
      bio,
      next
    );
    if (tulos.affectedRows > 0) {
      res.json({
        message: 'user modified',
        cat_id: tulos.insertId,
      });
    } else {
      next(httpError('No user modified', 400));
    }
  } catch (e) {
    console.log('user_edit error', e.message);
  }
}
/* const user_put = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('user_post validation', errors.array());
    next(httpError('invalid data :)', 400));
    return;
  }

  try {
    console.log('lomakkeesta', req.body);
    const user_post = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('user_post validation', errors.array());
        next(httpError('invalid data :)', 400));
        return;
      }
    
      try {
        console.log('lomakkeesta', req.body);
        const { email, ppicture, bio } = req.body;
        // hash password
        const hash = bcrypt.hashSync(password, salt);
        const tulos = await updateUser(ppicture, email, bio, next);
        if (tulos.affectedRows > 0) {
          res.json({
            message: 'user edit',
            user_id: tulos.insertId,
          });
        } else {
          next(httpError('No user inserted', 400));
        }
      } catch (e) {
        console.log('user_post error', e.message);
        next(httpError('internal server error', 500));
      }
    };
  } catch (e) {
    console.log('user_post error', e.message);
    next(httpError('internal server error', 500));
  }
}; */

module.exports = {
  login,
  user_post,
  user_edit,
  /* user_put */
};
