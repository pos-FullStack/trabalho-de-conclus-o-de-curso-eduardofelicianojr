const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'velha_figura_linguagem', 
  'root',                   
  'root',          
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }
);

module.exports = sequelize;
