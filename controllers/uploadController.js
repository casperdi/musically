'use strict';
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { addVideo } = require('../models/userModel');
const { httpError } = require('../utils/errors');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);



const addPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('addPost validation', errors.array());
    next(httpError('invalid data :)', 400));
    return;
  }

  try {
    console.log('lomakkeesta', req.body);
    const { video, caption } = req.body;
    // hash password
    
    const tulos = await addVideo(video, caption, req.params.id, next);
    if (tulos.affectedRows > 0) {
      res.json({
        message: 'video added',
        user_id: tulos.insertId,
      });
    } else {
      next(httpError('No video inserted', 400));
    }
  } catch (e) {
    console.log('addPost error', e.message);
    next(httpError('internal server error', 500));
  }
};



module.exports = {
  addPost,
  /* user_put */
};
