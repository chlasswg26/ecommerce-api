const express = require('express');
const Route = express.Router();
const userControllers = require('../controller/user');

const { authentication, authorization } = require('../middleware/auth');

Route
  .get('/', userControllers.getUser)
  .get('/:id', userControllers.getUserById)
  .get('/address/:id', userControllers.getUserByAddress)
  .post('/', userControllers.postUser)
  .put('/:id', userControllers.putUser)
  .delete('/:id', userControllers.deleteUser);

module.exports = Route;
