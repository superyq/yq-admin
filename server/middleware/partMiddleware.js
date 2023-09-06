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

module.exports = {
  recordMiddleware
}