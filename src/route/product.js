const express = require('express');
const Route = express.Router();
const productControllers = require('../controller/product');

const { verifyToken, authorization } = require('../middleware/auth');
const { multer } = require('../middleware/multer');
const { cache } = require('../middleware/redis');

Route
  .get('/', verifyToken, cache, productControllers.getProduct)
  .get('/:id', verifyToken, productControllers.getProductById)
  .get('/seller/:id', verifyToken, cache, productControllers.getProductBySeller)
  .post('/', verifyToken, multer, productControllers.postProduct)
  .put('/:id', verifyToken, multer, productControllers.putProduct)
  .delete('/:id', verifyToken, authorization, productControllers.deleteProduct);

module.exports = Route;
