const JWT = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (!req.isAuth) {
    req.user = null;
    return next();
  }
  const rawToken = req.headers.authorization.split(" ")[1];
  try {
    const user = JWT.decode(rawToken, process.env.JWT_SECRET).user;
    req.user = user;
    req.isAuth = true;
  } catch (e) {
    req.isAuth = false;
    req.user = null;
  }
  next();
};
