const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  firstName: String,
  lastName: String,
  avatar: String,
  password: String,
});
// UserSchema.pre("aggregate", function () {
//   console.log(this);
//   crypto.createHash('md5').update(data).digest("hex");
// });

module.exports = Mongoose.model("users", UserSchema);
