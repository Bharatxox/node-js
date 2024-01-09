var express = require("express");
const contModel = require("./contact");
const userModel = require("./user");
const passport = require("passport");
const localStrategy = require("passport-local");
var router = express.Router();
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", isLogggedin, function (req, res, next) {
  const userdata = req.session.passport.user;
  console.log(userdata);
  res.render("index", { user: userdata });
});
router.get("/signup", function (req, res, next) {
  res.render("signup");
});
router.get("/login", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});

router.get("/dash", async function (req, res, next) {
  const userdata = await userModel.find();
  res.render("dash", { user: userdata });
});

router.get("/edit/:userID", async (req, res) => {
  const userID = req.params.userID;
  const userData = await userModel.findById(userID);
  res.render("edit", { user: userData });
});

router.post("/update/:userID", async (req, res) => {
  const userID = req.params.userID;
  const updatedData = req.body;
  try {
    await userModel.findByIdAndUpdate(userID, updatedData);
    res.redirect("/dash");
  } catch (error) {
    res.status(500).send("Error updating user data");
  }
});

router.get("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await userModel.findByIdAndDelete(userId);
    res.redirect("/dash")
  } catch (error) {
    res.status(500).send("Error updating user data");
  }
});

//------- passport authentication routes ---------->

router.post("/contact", async function (req, res) {
  const { email, name, phone } = req.body;
  const user = await contModel.create({
    name: name,
    email: email,
    phoneNumber: phone,
  });
  res.send(user);
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

router.post("/register", function (req, res) {
  const { email, username, name, phone, password } = req.body;
  const userData = new userModel({ email, username, phone, name });
  // console.log(password);

  userModel
    .register(userData, password)
    .then(() => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    })
    .catch((error) => {
      console.error(error);
     
      // Handle registration failure, e.g., redirect to a registration error page
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

// router.post(
//   "/signup",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/signup",
//     failureFlash: true,
//   }),
//   function (req, res) {}
// );
function isLogggedin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("login");
}

module.exports = router;
