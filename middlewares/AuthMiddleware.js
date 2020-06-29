module.exports = (req, res, next) => {
  req.isAuth = true;
  next();
};
