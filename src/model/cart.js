const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Cart = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isNumeric: true,
      isInt: true
    }
  },
  product: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isNumeric: true,
      isInt: true
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isNumeric: true,
      isInt: true
    }
  }
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  freezeTableName: true,
  initialAutoIncrement: 1
}
);

module.exports = Cart;
