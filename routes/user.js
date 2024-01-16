const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ebook");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // You may want to add more validation for email format
  },
  password: {
    type: String,

    // You may want to add more security measures for password storage
  },
  phone: {
    type: String,
    required: true,
    // You may want to add validation for phone number format
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});
userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);
