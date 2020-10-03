const express = require('express');
const Route = express.Router();
const bannerControllers = require('../controller/banner');

const { verifyToken, authorization } = require('../middleware/auth');

Route
  .get('/', verifyToken, bannerControllers.getBanner)
  .get('/:id', verifyToken, bannerControllers.getBannerById)
  .post('/', verifyToken, authorization, bannerControllers.postBanner)
  .put('/:id', verifyToken, authorization, bannerControllers.putBanner)
  .delete('/:id', verifyToken, authorization, bannerControllers.deleteBanner);

module.exports = Route;
