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

sequelize
  .sync()

/**
   * Uncomment these below for development only
   * Forcing sync
   */

// .sync({ force: true })

  .then(_result => {
    console.log('Sequelize database connected');

    const server = app.listen(process.env.PORT, process.env.HOST, function () {
      const host = server.address().address;
      const port = server.address().port;

      console.log(`Listen port at ${host}:${port}`);
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
        credentials: false,
        optionSuccessStatus: 200
      })
    );
    app.use('/', routeNavigator);
  })
  .catch(_error => {
    console.log('Sequelize database disconnected');
  });

module.exports = app;
