const express = require('express');
const Route = express.Router();
const addressControllers = require('../controller/address');

const { authentication, authorization } = require('../middleware/auth');

Route
  .get('/', addressControllers.getAddress)
  .get('/:id', addressControllers.getAddressById)
  .post('/', addressControllers.postAddress)
  .put('/:id', addressControllers.putAddress)
  .delete('/:id', addressControllers.deleteAddress);

module.exports = Route;
