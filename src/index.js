const express = require('express');
const Route = express.Router();

const categoryRoutes = require('./route/category');

Route
  .use('/category', categoryRoutes);

module.exports = Route;
