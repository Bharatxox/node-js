var express = require("express");
const contModel = require("./contact");
const userModel = require("./user")
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/contact", async function (req, res) {
  const { email, name, phone } = req.body;
 const user =  await contModel.create({
    name: name,
    email: email,
    phoneNumber: phone,
  });
  res.send(user)
});

router.post("/signup", async function (req, res) {
  const { email, name, phone,username,password } = req.body;
 const user =  await contModel.create({
    name: name,
    email: email,
    phoneNumber: phone,
    username:username
  });
  // Logic for further authentication
});



module.exports = router;
