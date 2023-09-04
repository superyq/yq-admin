const express = require("express");
const md5 = require("md5");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  const data = await UserModel.find({ username, password: md5(password) });
  if (data.length == 0) {
    res.json({
      code: 500,
      msg: "用户不存在，请先注册！",
    });
  } else {
    console.log(data);
    let token = jwt.sign(
      {
        uid: 123,
      },
      "yqcoder",
      {
        expiresIn: 60 * 60 * 24, // 单位秒
      }
    );
    res.json({
      code: 200,
      msg: "success",
      token,
    });
  }
});

module.exports = router;
