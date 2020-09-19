const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');

const History = sequelize.define('history', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  seller: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  customer: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  payment: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shipping: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('1', '2', '3'),
    allowNull: false,
    defaultValue: '1'
  },
  added: {
    type: 'timestamp',
    allowNull: false,
    defaultValue: Sequelize.literal('current_timestamp()')
  },
  updated: {
    type: 'timestamp',
    allowNull: false,
    defaultValue: Sequelize.literal('current_timestamp() ON UPDATE current_timestamp()')
  }
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
}
);

module.exports = History;
