const Professor = require('./Professor');
const Questao = require('./Questao');
const Jogo = require('./Jogo');
const Jogador = require('./Jogador');
const Jogada = require('./Jogada');
const JogoQuestao = require('./JogoQuestao');

// Professor
Professor.hasMany(Questao, { foreignKey: 'professor_id' });
Professor.hasMany(Jogo, { foreignKey: 'professor_id' });

// Questão
Questao.belongsTo(Professor, { foreignKey: 'professor_id' });
Questao.hasMany(Jogada, { foreignKey: 'questao_id' });

// Jogo
Jogo.belongsTo(Professor, { foreignKey: 'professor_id' });
Jogo.hasMany(Jogador, { foreignKey: 'jogo_id' });

// Jogo ↔ Questões
Jogo.belongsToMany(Questao, {
  through: JogoQuestao,
  foreignKey: 'jogo_id',
  otherKey: 'questao_id',
  as: 'Questoes' // Alias consistente para o include
});
Questao.belongsToMany(Jogo, {
  through: JogoQuestao,
  foreignKey: 'questao_id',
  otherKey: 'jogo_id',
  as: 'Jogos' // Pode deixar o alias como 'Jogos', mas ele não interferirá no include de Questao
});

// Jogador
Jogador.belongsTo(Jogo, { foreignKey: 'jogo_id' });
Jogador.hasMany(Jogada, { foreignKey: 'jogador_id' });

// Jogada
Jogada.belongsTo(Jogador, { foreignKey: 'jogador_id' });
Jogada.belongsTo(Questao, { foreignKey: 'questao_id' });

module.exports = {
  Professor,
  Questao,
  Jogo,
  Jogador,
  Jogada,
  JogoQuestao
};