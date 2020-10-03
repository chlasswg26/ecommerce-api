const express = require('express');
const Route = express.Router();
const categoryControllers = require('../controller/category');

const { verifyToken, authorization } = require('../middleware/auth');

Route
  .get('/', verifyToken, categoryControllers.getCategory)
  .get('/:id', verifyToken, categoryControllers.getCategoryById)
  .post('/', verifyToken, authorization, categoryControllers.postCategory)
  .put('/:id', verifyToken, authorization, categoryControllers.putCategory)
  .delete('/:id', verifyToken, authorization, categoryControllers.deleteCategory);

module.exports = Route;
