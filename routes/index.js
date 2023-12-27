var express = require("express");
const userModel = require("./users");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/signup", async function (req, res) {
  const { email, name, phone } = req.body;
 const user =  await userModel.create({
    name: name,
    email: email,
    phoneNumber: phone,
  });
  res.send(user)
});



module.exports = router;
