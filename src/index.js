const express = require('express');
const Route = express.Router();

const categoryRoutes = require('./route/category');
const addressRoutes = require('./route/address');

Route
  .use('/category', categoryRoutes)
  .use('/address', addressRoutes);

module.exports = Route;
