const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Jogada = sequelize.define('jogada', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jogador_id: DataTypes.INTEGER,
  questao_id: DataTypes.INTEGER,
  posicao_tabuleiro: DataTypes.STRING,
  resposta_dada: DataTypes.STRING,
  correta: DataTypes.BOOLEAN,
  data_hora: DataTypes.DATE
});

module.exports = Jogada;
