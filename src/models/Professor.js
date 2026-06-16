const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professor = sequelize.define('professor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING
});

module.exports = Professor;
