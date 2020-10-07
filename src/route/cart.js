const express = require('express');
const Route = express.Router();
const cartControllers = require('../controller/cart');
const { verifyToken } = require('../middleware/auth');

Route
  .get('/', verifyToken, cartControllers.getCart)
  .get('/:id', verifyToken, cartControllers.getCartById)
  .get('/user/:id', verifyToken, cartControllers.getCartByUser)
  .post('/', verifyToken, cartControllers.postCart)
  .put('/:id', verifyToken, cartControllers.putCart)
  .delete('/:id', verifyToken, cartControllers.deleteCart);

module.exports = Route;
