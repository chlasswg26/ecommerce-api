const express = require('express');
const Route = express.Router();
const userControllers = require('../controller/user');

const { authentication, authorization } = require('../middleware/auth');
const { multer } = require('../middleware/multer');

Route
  .get('/', userControllers.getUser)
  .get('/:id', userControllers.getUserById)
  .get('/address/:id', userControllers.getUserByAddress)
  .post('/', multer, userControllers.postUser)
  .put('/:id', multer, userControllers.putUser)
  .delete('/:id', userControllers.deleteUser);

module.exports = Route;
