const express = require('express');
const Route = express.Router();
const addressControllers = require('../controller/address');

const { verifyToken } = require('../middleware/auth');

Route
  .get('/', verifyToken, addressControllers.getAddress)
  .get('/:id', verifyToken, addressControllers.getAddressById)
  .get('/user/:id', verifyToken, addressControllers.getAddressByUser)
  .post('/', verifyToken, addressControllers.postAddress)
  .put('/:id', verifyToken, addressControllers.putAddress)
  .delete('/:id', verifyToken, addressControllers.deleteAddress);

module.exports = Route;
