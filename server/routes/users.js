const express = require("express");
const UserModel = require("../models/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { formidable } = require("formidable");
const path = require("path");

const router = express.Router();

// 用户注册
router.post("/register", async (req, res, next) => {
  let { userName, password } = req.body;
  const users = await UserModel.find({ userName });
  if (users.length > 0) {
    res.json({
      code: 500,
      msg: "用户已经存在",
    });
  } else {
    UserModel.create({
      ...req.body,
      password: md5(password),
    });
    res.json({
      code: 200,
      msg: "success",
    });
  }
});

// 获取用户详情
router.get("/userinfo", async (req, res, next) => {
  let token = req.get("Authorization");

  jwt.verify(token.split(" ")[1], "yqcoder", async (err, data) => {
    if (!!err) {
      return res.json({
        code: 500,
        msg: err,
      });
    }

    const userInfo = await UserModel.findOne({ userName: data.userName });
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

// 修改用户详情
router.post("/userinfo", async (req, res, next) => {
  let token = req.get("Authorization").split(" ")[1];

  jwt.verify(token, "yqcoder", async (err, data) => {
    if (!!err) {
      return res.json({
        code: 500,
        msg: err,
      });
    }

    const userInfo = await UserModel.findOne({ userName: data.userName });
    if (!userInfo) {
      return res.json({
        code: 500,
        msg: "用户不存在",
      });
    }
    const result = await UserModel.updateOne(req.body);
    res.json({
      code: 200,
      msg: "success",
    });
  });
});

// 修改头像
router.post("/avatar", (req, res, next) => {
  console.log(1, req);
  const form = formidable({
    multiples: true,
    uploadDir: path.resolve(__dirname, "../public/images"),
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(fields, files.files[0].newFilename);
  });
  return;
  let token = req.get("Authorization").split(" ")[1];

  jwt.verify(token, "yqcoder", async (err, data) => {
    if (!!err) {
      return res.json({
        code: 500,
        msg: err,
      });
    }

    const userInfo = await UserModel.findOne({ userName: data.userName });
    if (!userInfo) {
      return res.json({
        code: 500,
        msg: "用户不存在",
      });
    }

    const form = formidable({
      multiples: true,
      uploadDir: path.resolve(__dirname, "/../public/images"),
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      console.log(fields, files);
    });
    // const result = await UserModel.updateOne(req.body);
    // console.log(3, result);
    // res.json({
    //   code: 200,
    //   msg: "success",
    // });
  });
});

module.exports = router;
