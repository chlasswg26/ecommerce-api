const express = require('express');
const Route = express.Router();
const userControllers = require('../controller/user');

const { verifyToken, authorization } = require('../middleware/auth');
const { multer } = require('../middleware/multer');

Route
  .get('/', verifyToken, userControllers.getUser)
  .get('/:id', verifyToken, userControllers.getUserById)
  .get('/address/:id', verifyToken, userControllers.getUserByAddress)
  .post('/', verifyToken, authorization, multer, userControllers.postUser)
  .put('/:id', verifyToken, authorization, multer, userControllers.putUser)
  .delete('/:id', verifyToken, authorization, userControllers.deleteUser);

module.exports = Route;
