const express = require('express');
const Route = express.Router();
const userControllers = require('../controller/user');

const { verifyToken, authorization } = require('../middleware/auth');
const { multer } = require('../middleware/multer');

Route
  .get('/', userControllers.getUser)
  .get('/:id', userControllers.getUserById)
  .get('/address/:id', verifyToken, userControllers.getUserByAddress)
  .post('/', multer, userControllers.postUser)
  .put('/:id', multer, userControllers.putUser)
  .delete('/:id', verifyToken, authorization, userControllers.deleteUser);

module.exports = Route;
