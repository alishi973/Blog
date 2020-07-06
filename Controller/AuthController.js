const UsersModel = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");
module.exports = {
  Login: async (req, res) => {
    console.log(req.body);
    if (req.isAuth) return res.status(200).send("ok");
    if (!req.body.username || !req.body.password) return res.status(400).send("نام کاربری یا کلمه عبور وجود ندارد");
    const user = await UsersModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) res.status(404).send("کاربری با کلمه عبور و نام کاربری داده شده یافت نشد");
    else {
      res.send({
        status: 200,
        jwt: jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" }),
      });
    }
  },
  Register: async (req, res) => {
    if (req.isAuth) return res.status(200).send("ok");
    if (!req.body.username || !req.body.password) return res.status(400).send("نام کاربری یا کلمه عبور ارسال نشده است");

    const newUser = new UsersModel();
    Object.assign(newUser, req.body);
    try {
      await newUser.save();
      res.send(newUser);
    } catch (e) {
      if (e.code == 11000) res.send("نام کاربری از قبل موجود می باشد");
      else res.send(e);
    }
  },
  GetMe: (req, res) => {
    res.send(req.isAuth || false);
  },
};
