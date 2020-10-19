const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const routeNavigator = require('./src/index');
const sequelize = require('./src/config/sequelize');
const User = require('./src/model/user');
const Address = require('./src/model/address');
const Cart = require('./src/model/cart');
const Product = require('./src/model/product');
const History = require('./src/model/history');
const Category = require('./src/model/category');
const Payment = require('./src/model/payment');

User.hasMany(Address, {
  foreignKey: 'user'
});
User.belongsTo(Address, {
  as: 'active_address',
  foreignKey: 'address',
  constraints: false
});
Address.belongsTo(User, {
  as: 'active_user',
  foreignKey: 'user',
  constraints: false
});
Cart.belongsTo(User, {
  as: 'active_user',
  foreignKey: 'user',
  constraints: false
});
Cart.belongsTo(Product, {
  as: 'active_product',
  foreignKey: 'product',
  constraints: false
});
History.belongsTo(User, {
  as: 'active_seller',
  foreignKey: 'seller',
  constraints: false
});
History.belongsTo(User, {
  as: 'active_customer',
  foreignKey: 'customer',
  constraints: false
});
History.belongsTo(Product, {
  as: 'active_product',
  foreignKey: 'product',
  constraints: false
});
History.belongsTo(Payment, {
  as: 'active_payment',
  foreignKey: 'payment',
  constraints: false
});
History.belongsTo(Address, {
  as: 'active_address',
  foreignKey: 'shipping',
  constraints: false
});
Product.belongsTo(Category, {
  as: 'active_category',
  foreignKey: 'category',
  constraints: false
});
Product.belongsTo(User, {
  as: 'active_seller',
  foreignKey: 'seller',
  constraints: false
});

sequelize
  .sync()

/**
 * Uncomment these below for development only
 * Forcing sync
 */

// .sync({ force: true })

  .then(_result => {
    console.log('Sequelize database connected');

    const server = app.listen(process.env.PORT, function () {
      const port = server.address().port;

      console.log(`Listen port at ${port}`);
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(morgan('dev'));
    app.use(
      cors({
        origin: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        credentials: true,
        optionSuccessStatus: 200
      })
    );
    app.use('/', routeNavigator);
  })
  .catch(_error => {
    console.log('Sequelize database disconnected');
  });

module.exports = app;
