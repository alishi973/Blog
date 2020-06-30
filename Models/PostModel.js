const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PostModel = new Schema(
  {
    title: { type: String, required: true },
    images: [{ type: String }],
    content: { type: String, required: true },
    summary: { type: String, default: "" },
    likes: [{ user: { type: Schema.Types.ObjectId, ref: "users" }, score: { type: Number } }],
    comments: [{ user: String, text: String, date: Date }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("posts", PostModel);
