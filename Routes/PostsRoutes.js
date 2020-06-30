const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const Santizer = require("../middlewares/Santizer");
const UserMiddleware = require("../middlewares/UserMiddleware");
const PostController = require("../Controller");

const postFilter = ["images", "title", "content"];
router.post(
  "/new",
  (req, res, next) => Santizer(req, postFilter, true, next),
  AuthMiddleware,
  UserMiddleware,
  PostController.PostController.NewPost
);
router.get("/:postID", PostController.PostController.Show);

module.exports = router;
