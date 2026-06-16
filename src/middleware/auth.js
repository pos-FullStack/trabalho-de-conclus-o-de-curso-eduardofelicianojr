module.exports = (req, res, next) => {
  if (!req.session.professor) {
    return res.redirect('/login');
  }
  next();
};
