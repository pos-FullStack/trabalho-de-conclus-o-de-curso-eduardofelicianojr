module.exports = (req, res, next) => {
  if (!req.session.jogadorId) {
    return res.redirect('/entrar');
  }
  next();
};