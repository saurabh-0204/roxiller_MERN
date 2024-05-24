
const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database');

const Transaction = db.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dateOfSale: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Transaction;
