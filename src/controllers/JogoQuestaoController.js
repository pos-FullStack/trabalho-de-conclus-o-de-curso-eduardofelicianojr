const { Jogo, Questao, JogoQuestao } = require('../models');

module.exports = {

  // Tela para gerenciar questões de um jogo
  async gerenciar(req, res) {
    if (!req.session.professor) return res.redirect('/login');

    const jogo = await Jogo.findByPk(req.params.jogoId, { raw: true });

    // Buscar todas as questões do professor
    const questoes = await Questao.findAll({
      where: { professor_id: req.session.professor.id },
      raw: true
    });

    // Questões já vinculadas ao jogo
    const vinculos = await JogoQuestao.findAll({
      where: { jogo_id: req.params.jogoId },
      raw: true
    });

    const questoesVinculadas = vinculos.map(v => v.questao_id);

    res.render('admin/jogo-questoes', { jogo, questoes, questoesVinculadas });
  },

  // Salvar vínculos
  async salvar(req, res) {
    if (!req.session.professor) return res.redirect('/login');

    const { jogoId } = req.params;
    const { questaoIds } = req.body; // array de IDs de questões

    // Deletar vínculos antigos
    await JogoQuestao.destroy({ where: { jogo_id: jogoId } });

    // Inserir novos vínculos
    if (questaoIds && questaoIds.length > 0) {
      const dados = questaoIds.map(id => ({
        jogo_id: jogoId,
        questao_id: id
      }));
      await JogoQuestao.bulkCreate(dados);
    }

    res.redirect(`/admin/jogos/questoes/${jogoId}`);
  }

};