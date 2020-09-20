const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Address = sequelize.define('address', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
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

module.exports = Address;
