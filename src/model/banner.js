const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Banner = sequelize.define('banner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  image: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  reference: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('1', '2'),
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

module.exports = Banner;
