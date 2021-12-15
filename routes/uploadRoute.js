'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const path = require("path");
const fs = require("fs");

const multer = require("multer");
const { addPost, post_list_get, get_user_post } = require('../controllers/uploadController');
const { getUserPost, deletePost } = require('../models/userModel');

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "../temp"
});

router
  .route('/post')
  .get(post_list_get)
  ;

  router.get('/userPost/:id', async (req,res,next ) => {
    try {
      const posts = await getUserPost(next, req.params.id);
      if (posts.length > 0) {
        res.json(posts);
      } else {
        next('No post found', 404);
      }
    } catch (e) {
      console.log('get_user_post error', e.message);
      next(httpError('internal server error', 500));
    }
  })

  router.delete('/deletePost/:id', async (req,res,next ) => {
    try {
      const posts = await deletePost(next, req.params.id);
      if (posts.affectedRows > 0) {
        res.json({
          message: 'delete modified',
          post_id: posts.insertId,
        });
      } else {
        next('No deletePost found', 404);
      }
    } catch (e) {
      console.log('deletePost error', e.message);
      next(httpError('internal server error', 500));
    }
  }) 

router
.route('/addData/:id')
.post(
  body('video'),
  body('caption').isLength({max: 200}).escape(),
  addPost  
);


router.post(
  "/photo",
  upload.single("photo" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../uploads/"+req.file.originalname);
    const allowedFileTypes = [".png",".jpg"]
    if (allowedFileTypes.includes(path.extname(req.file.originalname).toLowerCase())) {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res.json({ "fileUrl": "/"+req.file.originalname});
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png/.jpg files are allowed!");
      });
    }
  }
);

router.post(
  "/video",
  upload.single("video" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../uploads/"+req.file.originalname);
    const allowedFileTypes = [".mp4"]
    if (allowedFileTypes.includes(path.extname(req.file.originalname).toLowerCase())) {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res.json({ "fileUrl": "/"+req.file.originalname});
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .mp4 files are allowed!");
      });
    }
  }
);

module.exports = router;