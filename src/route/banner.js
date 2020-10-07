const express = require('express');
const Route = express.Router();
const bannerControllers = require('../controller/banner');

const { verifyToken, authorization } = require('../middleware/auth');
const { multer } = require('../middleware/multer');

Route
  .get('/', verifyToken, bannerControllers.getBanner)
  .get('/:id', verifyToken, bannerControllers.getBannerById)
  .post('/', verifyToken, authorization, multer, bannerControllers.postBanner)
  .put('/:id', verifyToken, authorization, multer, bannerControllers.putBanner)
  .delete('/:id', verifyToken, authorization, bannerControllers.deleteBanner);

module.exports = Route;
