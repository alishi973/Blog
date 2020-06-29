const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const Santizer = require("../middlewares/Santizer");
const UsersModel = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");

const requiredProp = [
  "username",
  "firstName",
  "lastName",
  "password",
  "avatar",
];

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
router.post(
  "/register",
  (req, _, next) => Santizer(req, requiredProp, true, next),
  AuthMiddleware,
  async (req, res) => {
    if (req.isAuth) return res.status(200).send("ok");
    if (!req.body.username || !req.body.password)
      return res.status(400).send("نام کاربری یا کلمه عبور ارسال نشده است");

    const newUser = new UsersModel();
    Object.assign(newUser, req.body);
    try {
      await newUser.save();
      res.send(newUser);
    } catch (e) {
      if (e.code == 11000) res.send("نام کاربری از قبل موجود می باشد");
      else res.send(e);
    }
  }
);

module.exports = router;
