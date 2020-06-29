const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.get("/login", AuthMiddleware, (req, res) => {
});


module.exports = router;
