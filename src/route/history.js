const express = require('express');
const Route = express.Router();
const historyControllers = require('../controller/history');

const { verifyToken } = require('../middleware/auth');

Route
  .get('/', verifyToken, historyControllers.getHistory)
  .get('/:id', verifyToken, historyControllers.getHistoryById)
  .get('/seller/:id', verifyToken, historyControllers.getHistoryBySeller)
  .get('/customer/:id', verifyToken, historyControllers.getHistoryByCustomer)
  .post('/', verifyToken, historyControllers.postHistory)
  .put('/:id', verifyToken, historyControllers.putHistory)
  .delete('/:id', verifyToken, historyControllers.deleteHistory);

module.exports = Route;
