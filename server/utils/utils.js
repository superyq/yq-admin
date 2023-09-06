const jwt = require("jsonwebtoken");
const { DBKEY } = require("../config/config");
const UserModel = require("../models/UserModel");

let tokenToUser = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, DBKEY, async (err, data) => {
      if (!!err) {
        reject({
          code: 500,
          msg: err.message,
        });
      }

      const userInfo = await UserModel.findOne({ userName: data.userName });
      if (!userInfo) {
        reject({
          code: 500,
          msg: "用户不存在",
        });
      }

      resolve({
        code: 200,
        msg: "success",
        data: userInfo,
      });
    });
  });
};

module.exports = {
  tokenToUser,
};
