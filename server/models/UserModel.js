const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  realName: {
    type: String,
    default: ""
  },
  phoneNumber: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    type: Array,
    default: []
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
