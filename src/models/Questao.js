const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Questao = sequelize.define('questao', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  enunciado: { type: DataTypes.TEXT, allowNull: false },
  alternativaA: { type: DataTypes.STRING, allowNull: false },
  alternativaB: { type: DataTypes.STRING, allowNull: false },
  alternativaC: { type: DataTypes.STRING, allowNull: false },
  alternativaD: { type: DataTypes.STRING, allowNull: false },
  correta: { type: DataTypes.CHAR(1), allowNull: false },
  feedback: { type: DataTypes.TEXT, allowNull: false },
  professor_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'questao',
  timestamps: false
});

// Associação N:N com Jogo através de JogoQuestao
Questao.associate = models => {
  Questao.belongsToMany(models.Jogo, {
    through: models.JogoQuestao,
    foreignKey: 'questao_id',
    otherKey: 'jogo_id',
    as: 'Jogos' // alias opcional do outro lado
  });

  Questao.belongsTo(models.Professor, { foreignKey: 'professor_id' });
};

module.exports = Questao;