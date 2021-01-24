const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('user', {
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
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  role: {
    type: DataTypes.ENUM('1', '2'),
    allowNull: false,
    defaultValue: '1'
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isNumeric: true,
      isInt: true
    }
  },
  image: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  store: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  address: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isNumeric: true,
      isInt: true
    }
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: true,
    validate: {
      isNumeric: true,
      isInt: true
    }
  },
  verify_code: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  verify: {
    type: DataTypes.ENUM('1', '2'),
    allowNull: false,
    defaultValue: '1',
    validate: {
      notNull: true,
      notEmpty: true,
      isNumeric: true,
      isInt: true
    }
  },
  seller: {
    type: DataTypes.ENUM('1', '2'),
    allowNull: false,
    defaultValue: '1'
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

module.exports = User;
