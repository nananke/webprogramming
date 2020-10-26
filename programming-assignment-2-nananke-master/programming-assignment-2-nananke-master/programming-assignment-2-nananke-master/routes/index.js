const express = require('express');
const Post = require('../models/Post.js');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Front Page' });
});



module.exports = router;
