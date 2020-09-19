const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const routeNavigator = require('./src/index');

const server = app.listen(process.env.PORT, process.env.HOST, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Listen port at ${host}:${port}`);
});

const sequelize = require('./src/config/sequelize');
// const Address = require('./src/model/address');
// const Banner = require('./src/model/banner');
// const Category = require('./src/model/category');
// const History = require('./src/model/history');
// const Payment = require('./src/model/payment');
// const Product = require('./src/model/product');
// const User = require('./src/model/user');

sequelize
  .sync()
  .then(_result => {
    console.log('Sequelize database connected');

    // Address.findAll()
    //   .then(response => console.log('Finding Address Data:', response))
    //   .catch(error => console.log('Trouble Finding Address:', error));
    // Banner.findAll()
    //   .then(response => console.log('Finding Banner Data:', response))
    //   .catch(error => console.log('Trouble Finding Banner:', error));
    // Category.findAll()
    //   .then(response => console.log('Finding Category Data:', response))
    //   .catch(error => console.log('Trouble Finding Category:', error));
    // History.findAll()
    //   .then(response => console.log('Finding History Data:', response))
    //   .catch(error => console.log('Trouble Finding History:', error));
    // Payment.findAll()
    //   .then(response => console.log('Finding Payment Data:', response))
    //   .catch(error => console.log('Trouble Finding Payment:', error));
    // Product.findAll()
    //   .then(response => console.log('Finding Product Data:', response))
    //   .catch(error => console.log('Trouble Finding Product:', error));
    // User.findAll()
    //   .then(response => console.log('Finding User Data:', response))
    //   .catch(error => console.log('Trouble Finding User:', error));
  })
  .catch(_error => {
    console.log('Sequelize database disconnected');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: false,
    optionSuccessStatus: 200
  })
);
app.use('/', routeNavigator);

module.exports = app;
