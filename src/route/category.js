const express = require('express');
const Route = express.Router();
const categoryControllers = require('../controller/category');

const { authentication, authorization } = require('../middleware/auth');

Route
  .get('/', categoryControllers.getCategory);
// .get('/:id', authentication, categoryControllers.getCategoryById)
// .post('/', authentication, authorization, categoryControllers.postCategory)
// .put('/:id', authentication, authorization, categoryControllers.putCategory)
// .delete('/:id', authentication, authorization, categoryControllers.deleteCategory);

module.exports = Route;
