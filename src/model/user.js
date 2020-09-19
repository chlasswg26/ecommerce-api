const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('1', '2'),
    allowNull: false,
    defaultValue: '1'
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  address: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('1', '2'),
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

module.exports = User;
