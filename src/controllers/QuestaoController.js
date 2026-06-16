const { Questao } = require('../models');

module.exports = {

  // Listar questões do professor logado
  async listar(req, res) {
    if (!req.session.professor) {
      return res.redirect('/login');
    }

    const questoes = await Questao.findAll({
      where: { professor_id: req.session.professor.id },
      raw: true
    });

    res.render('admin/questoes', { questoes });
  },

  // Formulário de nova questão
  nova(req, res) {
    if (!req.session.professor) {
      return res.redirect('/login');
    }

    res.render('admin/nova-questao');
  },

  // Salvar nova questão
  async salvar(req, res) {
    if (!req.session.professor) {
      return res.redirect('/login');
    }

    await Questao.create({
      enunciado: req.body.enunciado,
      alternativaA: req.body.alternativaA,
      alternativaB: req.body.alternativaB,
      alternativaC: req.body.alternativaC,
      alternativaD: req.body.alternativaD,
      correta: req.body.correta,
      feedback: req.body.feedback,
      professor_id: req.session.professor.id
    });

    res.redirect('/admin/questoes');
  },

  // Formulário de edição
  async editar(req, res) {
    if (!req.session.professor) {
      return res.redirect('/login');
    }

    const questao = await Questao.findByPk(req.params.id, {
      raw: true
    });

    if (!questao) {
      return res.redirect('/admin/questoes');
    }

    res.render('admin/editar-questao', { questao });
  },

  // Atualizar questão
  async atualizar(req, res) {
    if (!req.session.professor) {
      return res.redirect('/login');
    }

    await Questao.update(
      {
        enunciado: req.body.enunciado,
        alternativaA: req.body.alternativaA,
        alternativaB: req.body.alternativaB,
        alternativaC: req.body.alternativaC,
        alternativaD: req.body.alternativaD,
        correta: req.body.correta,
        feedback: req.body.feedback
      },
      {
        where: {
          id: req.params.id,
          professor_id: req.session.professor.id
        }
      }
    );

    res.redirect('/admin/questoes');
  },

  // Excluir questão
async excluir(req, res) {
    if (!req.session.professor) {
      return res.redirect('/login');
    }

    await Questao.destroy({
      where: {
        id: req.params.id,
        professor_id: req.session.professor.id
      }
    });

    res.redirect('/admin/questoes');
  }

};
