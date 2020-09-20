const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');

const Product = sequelize.define('product', {
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
  image: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seller: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
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
  freezeTableName: true,
  initialAutoIncrement: 1
}
);

module.exports = Product;
