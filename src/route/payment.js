const express = require('express');
const Route = express.Router();
const paymentControllers = require('../controller/payment');

const { verifyToken, authorization } = require('../middleware/auth');
const { multer } = require('../middleware/multer');

Route
  .get('/', paymentControllers.getPayment)
  .get('/:id', paymentControllers.getPaymentById)
  .post('/', verifyToken, authorization, multer, paymentControllers.postPayment)
  .put('/:id', verifyToken, authorization, multer, paymentControllers.putPayment)
  .delete('/:id', verifyToken, authorization, paymentControllers.deletePayment);

module.exports = Route;
