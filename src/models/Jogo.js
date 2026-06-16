const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Jogo = sequelize.define('jogo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pin: { type: DataTypes.STRING(6), allowNull: false, unique: true },
  data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.ENUM('ativo', 'finalizado'), defaultValue: 'ativo' },
  professor_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'jogo',
  timestamps: false
});

// Associação N:N com Questao através de JogoQuestao
Jogo.associate = models => {
  Jogo.belongsToMany(models.Questao, {
    through: models.JogoQuestao,
    foreignKey: 'jogo_id',
    otherKey: 'questao_id',
    as: 'Questoes' // <- alias padronizado para usar no include
  });

  // Opcional: relação com professor
  Jogo.belongsTo(models.Professor, { foreignKey: 'professor_id' });
};

module.exports = Jogo;