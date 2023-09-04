const express = require("express");
const UserModel = require("../models/UserModel");
const md5 = require("md5");

const router = express.Router();

/* GET users listing. */
router.post("/register", async (req, res, next) => {
  let { username, password } = req.body;
  const users = await UserModel.find({ username });
  if (users.length > 0) {
    res.json({
      code: 500,
      msg: "用户已经存在",
    });
  } else {
    UserModel.create({
      username: username,
      password: md5(password),
    });
    res.json({
      code: 200,
      msg: "success",
    });
  }
});

module.exports = router;
