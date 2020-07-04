const PostModel = require("../Models/PostModel");
module.exports = {
  Feed: async (req, res) => {
    const posts = await PostModel.find({ active: true });
    res.json(posts);
  },
};
