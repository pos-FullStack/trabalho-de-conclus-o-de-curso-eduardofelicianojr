const { Questao, Jogo } = require('../models');

module.exports = {
  dashboard: async (req, res) => {
    if (!req.session.professor) return res.redirect('/login');

    const professorId = req.session.professor.id;

    const questoesCount = await Questao.count({ where: { professor_id: professorId } });
    const jogosCount = await Jogo.count({ where: { professor_id: professorId } });

    res.render('admin/dashboard', {
      professor: req.session.professor,
      questoesCount,
      jogosCount
    });
  }
};