const mongoose = require("mongoose");
const { DBHOST, DBPOST, DBNAME } = require("../config/config");

mongoose.connect(`mongodb://${DBHOST}:${DBPOST}/${DBNAME}`);

module.exports = new Promise((resolve, reject) => {
  mongoose.connection.once("open", () => {
    console.log("数据库已连接");
    resolve();
  });

  mongoose.connection.on("error", () => {
    console.log("error");
  });

  mongoose.connection.on("close", () => {
    console.log(close);
    reject();
  });
});
