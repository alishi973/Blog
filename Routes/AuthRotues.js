const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const UsersModel = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");

router.post("/login", AuthMiddleware, async (req, res) => {
  if (req.isAuth) return res.status(200).send("ok");
  if (!req.body.username || !req.body.password)
    return res.status(400).send("نام کاربری یا کلمه عبور وجود ندارد");
  const user = await UsersModel.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (!user)
    res.status(404).send("کاربری با کلمه عبور و نام کاربری داده شده یافت نشد");
  else {
    res.send({
      status: 200,
      jwt: jwt.sign({ user }, process.env.JWT_SECRET),
    });
  }
});


module.exports = router;
