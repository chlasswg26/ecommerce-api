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
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isNumeric: true,
      isInt: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
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

module.exports = Address;
