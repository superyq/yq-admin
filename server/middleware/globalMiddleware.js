const fs = require("fs");
const path = require("path");

let recordMiddleware = (req, res, next) => {
  let { url, ip } = req;
  fs.appendFileSync(
    path.resolve(__dirname, "../public/logs/access.log"),
    `${url} ${ip}\r\n`
  );
  next();
};

let tokenMiddleware = (req, res, next) => {
  let notoken = req.get("noToken");
  if (!!notoken) {
    res.json({
      code: 403,
      msg: "没权限",
    });
  } else {
    next();
  }
};

module.exports = {
  recordMiddleware,
  tokenMiddleware,
};
