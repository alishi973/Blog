const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.get("/new", AuthMiddleware, (req, res) => {
  if (!req.isAuth) return res.status(403).send("شما به این قسمت دسترسی ندارید");
  res.send("NewPost Hastam!");
});

module.exports = router;
