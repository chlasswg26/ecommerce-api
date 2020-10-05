const express = require('express');
const Route = express.Router();
const cartControllers = require('../controller/cart');

Route
  .get('/', cartControllers.getCart)
  .get('/:id', cartControllers.getCartById)
  .get('/user/:id', cartControllers.getCartByUser)
  .post('/', cartControllers.postCart)
  .put('/:id', cartControllers.putCart)
  .delete('/:id', cartControllers.deleteCart);

module.exports = Route;
