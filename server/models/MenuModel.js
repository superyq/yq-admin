const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  menuId: {
    type: Number,
    require: true
  },
  parentId: {
    type: Number,
    require: false
  },
  menuType: {
    type: String,
    require: true
  },
  status: {
    type: String | Number,
    require: true
  },
  menuName: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    require: false,
  },
  sort: {
    type: Number,
    require: true,
  },
  perms: {
    type: String
  }
});
