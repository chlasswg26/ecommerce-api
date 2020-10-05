const express = require('express');
const Route = express.Router();
const addressControllers = require('../controller/address');

const { verifyToken } = require('../middleware/auth');

Route
  .get('/', addressControllers.getAddress)
  .get('/:id', addressControllers.getAddressById)
  .get('/user/:id', addressControllers.getAddressByUser)
  .post('/', addressControllers.postAddress)
  .put('/:id', addressControllers.putAddress)
  .delete('/:id', addressControllers.deleteAddress);

module.exports = Route;
