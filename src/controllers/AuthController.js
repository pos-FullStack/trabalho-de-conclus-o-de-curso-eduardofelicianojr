const { Professor } = require('../models');

module.exports = {

  loginForm: (req, res) => {
    res.render('auth/professor', { layout: 'main' });
  },

  login: async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.render('auth/professor', {
        erro: 'Preencha todos os campos'
      });
    }

    const professor = await Professor.findOne({
      where: { email, senha }
    });

    if (!professor) {
      return res.render('auth/professor', {
        erro: 'Email ou senha inválidos'
      });
    }

    req.session.professor = {
      id: professor.id,
      nome: professor.nome,
      email: professor.email
    };

    res.redirect('/admin/dashboard');
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  }
};
