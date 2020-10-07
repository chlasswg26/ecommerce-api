const express = require('express');
const Route = express.Router();

const productRoutes = require('./route/product');
const historyRoutes = require('./route/history');
const paymentRoutes = require('./route/payment');
const cartRoutes = require('./route/cart');
const bannerRoutes = require('./route/banner');
const categoryRoutes = require('./route/category');
const addressRoutes = require('./route/address');
const userRoutes = require('./route/user');
const authRoutes = require('./route/auth');

Route
  .use('/product', productRoutes)
  .use('/history', historyRoutes)
  .use('/payment', paymentRoutes)
  .use('/cart', cartRoutes)
  .use('/banner', bannerRoutes)
  .use('/category', categoryRoutes)
  .use('/address', addressRoutes)
  .use('/user', userRoutes)
  .use('/auth', authRoutes);

module.exports = Route;
