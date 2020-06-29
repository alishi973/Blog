const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const Santizer = require("../middlewares/Santizer");
const Controllers = require("../Controller");

const requiredProp = ["username", "firstName", "lastName", "password", "avatar"];

router.post("/login", AuthMiddleware, Controllers.AuthController.Login);
router.post("/register", (req, _, next) => Santizer(req, requiredProp, true, next), AuthMiddleware, Controllers.AuthController.Register);
router.get("/me", AuthMiddleware,Controllers.AuthController.GetMe);

module.exports = router;
