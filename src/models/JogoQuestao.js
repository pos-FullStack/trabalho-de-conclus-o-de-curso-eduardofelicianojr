const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JogoQuestao = sequelize.define('JogoQuestao', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  jogo_id: { type: DataTypes.INTEGER, allowNull: false },
  questao_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'jogo_questao',
  timestamps: false
});

// Associações
JogoQuestao.associate = models => {
  JogoQuestao.belongsTo(models.Jogo, { foreignKey: 'jogo_id' });
  JogoQuestao.belongsTo(models.Questao, { foreignKey: 'questao_id' });
};

module.exports = JogoQuestao;