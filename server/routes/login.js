const express = require("express");
const md5 = require("md5");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { DBKEY } = require("../config/config");

const router = express.Router();

router.post("/login", async (req, res) => {
  let { userName, password } = req.body;
  const data = await UserModel.find({ userName, password: md5(password) });
  if (data.length == 0) {
    res.json({
      code: 500,
      msg: "账号或密码错误！",
    });
  } else {
    let token = jwt.sign(
      {
        userName: data[0].userName,
      },
      DBKEY,
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
