const PostModel = require("../Models/PostModel");
const ObjectId = require("mongoose").Types.ObjectId;
module.exports = {
  NewPost: async (req, res) => {
    if (!req.isAuth) return res.status(403).send("شما به این قسمت دسترسی ندارید");
    const { title, content } = req.body;
    if (!title || !content) return res.send("متن و عنوان الزامی میباشد");
    const newPost = new PostModel();
    Object.assign(newPost, { ...req.body, creator: req.user });
    await newPost.save();
    res.send(newPost);
  },
  
};
