const JWT = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const rawToken = req.headers.authorization.split(" ")[1] || false;
  try {
    JWT.verify(rawToken, process.env.JWT_SECRET);
    req.isAuth = true;
  } catch (e) {
    req.isAuth = false;
    req.user = null;
  }
  next();
};
