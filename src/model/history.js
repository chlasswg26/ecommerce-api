const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const History = sequelize.define('history', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  seller: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isNumeric: true,
      isInt: true
    }
  },
  customer: {
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
  },
  payment: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isNumeric: true,
      isInt: true
    }
  },
  shipping: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isNumeric: true,
      isInt: true
    }
  },
  status: {
    type: DataTypes.ENUM('1', '2', '3'),
    allowNull: false,
    defaultValue: '1'
  },
  added: {
    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    allowNull: true
  },
  updated: {
    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  freezeTableName: true,
  initialAutoIncrement: 1
}
);

module.exports = History;
