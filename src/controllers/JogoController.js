const { Jogo } = require('../models'); // Importa o model Jogo

module.exports = {

  // Listar todos os jogos do professor logado
  async listar(req, res) {
    if (!req.session.professor) return res.redirect('/login');

    const professorId = req.session.professor.id;

    try {
      const jogos = await Jogo.findAll({
        where: { professor_id: professorId },
        order: [['data_criacao', 'DESC']],
        raw: true
      });

      // Renderiza a tela de jogos
      res.render('admin/jogos', { jogos });

    } catch (error) {
      console.error('Erro ao listar jogos:', error);
      res.send('Erro ao listar jogos');
    }
  },

  // Exibe formulário para criar novo jogo
  nova(req, res) {
    if (!req.session.professor) return res.redirect('/login');

    res.render('admin/novo-jogo'); // Você pode criar essa view depois
  },

  // Salvar novo jogo no banco
  async salvar(req, res) {
    if (!req.session.professor) return res.redirect('/login');

    const professorId = req.session.professor.id;

    // Gera PIN aleatório de 6 caracteres
    const pin = Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
      await Jogo.create({
        pin,
        professor_id: professorId
      });

      res.redirect('/admin/jogos');

    } catch (error) {
      console.error('Erro ao criar jogo:', error);
      res.send('Erro ao criar jogo');
    }
  },

  // Excluir um jogo
  async excluir(req, res) {
    if (!req.session.professor) return res.redirect('/login');

    const professorId = req.session.professor.id;
    const jogoId = req.params.id;

    try {
      // Exclui somente se o jogo pertencer ao professor logado
      await Jogo.destroy({
        where: {
          id: jogoId,
          professor_id: professorId
        }
      });

      res.redirect('/admin/jogos');

    } catch (error) {
      console.error('Erro ao excluir jogo:', error);
      res.send('Erro ao excluir jogo');
    }
  }

};