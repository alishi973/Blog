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
); // Create Post
router.get("/:postID", PostController.PostController.Show); // Show Post

router.patch(
  "/update/:postID",
  (req, _, next) => Santizer(req, postFilter, true, next),
  AuthMiddleware,
  UserMiddleware,
  PostController.PostController.Update
); // Update Post
router.delete("/disable", AuthMiddleware, UserMiddleware, PostController.PostController.Disable);
router.post("/enable", AuthMiddleware, UserMiddleware, PostController.PostController.Enable);

router.post("/like", AuthMiddleware, UserMiddleware, PostController.PostController.Like);

module.exports = router;
