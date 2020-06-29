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
// });

module.exports = Mongoose.model("users", UserSchema);
