const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  userlogo: {
    type: String
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    type: Array
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
