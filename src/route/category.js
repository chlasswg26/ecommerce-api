const express = require('express');
const Route = express.Router();
const categoryControllers = require('../controller/category');

const { authentication, authorization } = require('../middleware/auth');

Route
  .get('/', categoryControllers.getCategory)
  .get('/:id', categoryControllers.getCategoryById)
  .post('/', categoryControllers.postCategory)
  .put('/:id', categoryControllers.putCategory)
  .delete('/:id', categoryControllers.deleteCategory);

module.exports = Route;
