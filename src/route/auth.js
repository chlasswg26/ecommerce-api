const express = require('express');
const Route = express.Router();
const authControllers = require('../controller/auth');

const { verifyRefreshToken } = require('../middleware/auth');
const { multer } = require('../middleware/multer');

Route
  .post('/register', multer, authControllers.postRegister)
  .post('/login', authControllers.postLogin)
  .put('/verify', authControllers.putVerify)
  .post('/token', verifyRefreshToken, authControllers.postRefreshToken);

module.exports = Route;
