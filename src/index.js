const express = require('express');
const Route = express.Router();

const categoryRoutes = require('./route/category');
const addressRoutes = require('./route/address');
const userRoutes = require('./route/user');
const authRoutes = require('./route/auth');

Route
  .use('/category', categoryRoutes)
  .use('/address', addressRoutes)
  .use('/user', userRoutes)
  .use('/auth', authRoutes);

module.exports = Route;
