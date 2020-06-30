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
  Show: async (req, res) => {
    let post;
    try {
      const postID = ObjectId(`${req.params.postID}`);
      post = await PostModel.findById(postID);
    } catch (e) {
      return res.send("ایدی پست صحیح نیست");
    }
    
    if (post) res.send(post);
    else res.status(404).send("مورد پیدا نشد");
  },
};
