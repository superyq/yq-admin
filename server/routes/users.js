const express = require("express");
const UserModel = require("../models/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 用户注册
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

// 详情
router.get("/getInfo", async (req, res) => {
  let token = req.get("Authorization");

  jwt.verify(token.split(" ")[1], "yqcoder", async (err, data) => {
    if (!!err) {
      return res.json({
        code: 500,
        msg: err,
      });
    }

    const userInfo = await UserModel.findOne({ username: data.username });
    console.log(userInfo);
    if (!userInfo) {
      return res.json({
        code: 500,
        msg: "用户不存在",
      });
    }
    res.json({
      code: 200,
      msg: "success",
      data: userInfo,
    });
  });
});

module.exports = router;
