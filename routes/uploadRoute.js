'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const path = require("path");
const fs = require("fs");

const multer = require("multer");
const { addPost } = require('../controllers/uploadController');

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
.route('/addData/:id')
.post(
  body('video'),
  body('caption'),
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