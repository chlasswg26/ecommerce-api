const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Payment = sequelize.define('payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('1', '2'),
    allowNull: false,
    defaultValue: '1'
  }
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  freezeTableName: true,
  initialAutoIncrement: 1
}
);

module.exports = Payment;
