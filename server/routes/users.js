const express = require("express");
const UserModel = require("../models/UserModel");
const md5 = require("md5");
const { formidable } = require("formidable");
const path = require("path");
const { tokenToUser } = require("../utils/utils");

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
  let token = req.get("Authorization").split(" ")[1];
  try {
    let userInfoObj = await tokenToUser(token);

    res.json(userInfoObj);
  } catch (err) {
    res.json(err);
  }
});

// 修改用户详情
router.post("/userinfo", async (req, res, next) => {
  let token = req.get("Authorization").split(" ")[1];
  try {
    let { data } = await tokenToUser(token);

    await UserModel.updateOne({ userName: data.userName }, req.body);
    res.json({
      code: 200,
      msg: "success",
    });
  } catch (err) {
    res.json(err);
  }
});

// 修改头像
router.post("/avatar", async (req, res, next) => {
  let token = req.get("Authorization").split(" ")[1];
  try {
    let { data } = await tokenToUser(token);

    const form = formidable({
      multiples: true,
      uploadDir: path.resolve(__dirname, "../public/images"),
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      let host = req.get("host");
      let fileName = files.file[0].newFilename;
      let url = `http://${host}/images/${fileName}`;

      await UserModel.updateOne(
        { userName: data.userName },
        { ...req.body, avatar: url }
      );
      res.json({
        code: 200,
        msg: "success",
        imgUrl: url,
      });
    });
  } catch (err) {
    res.json(err);
  }
});

// 修改密码
router.post("/updatePassword", async (req, res, next) => {
  let token = req.get("Authorization").split(" ")[1];

  try {
    let { data } = await tokenToUser(token);
    let oldPassword = md5(req.body.oldPassword);
    let newPassword = md5(req.body.newPassword);
    if (oldPassword !== data.password) {
      return res.json({
        code: 500,
        msg: "旧密码错误",
      });
    }
    await UserModel.updateOne(
      { userName: data.userName },
      { ...req.body, password: newPassword }
    );
    res.json({
      code: 200,
      msg: "success",
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
