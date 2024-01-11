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

  res.render("index", {
    user: userdata,
    successMessage: req.flash("success"),
    errorMessage: req.flash("error"),
  });
});
router.get("/signup", function (req, res, next) {
  res.render("signup", { error: req.flash("error") });
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
    res.redirect("/dash");
  } catch (error) {
    res.status(500).send("Error updating user data");
  }
});

//------- passport authentication routes ---------->

router.post("/contact", async function (req, res) {
<<<<<<< HEAD
  const { email, name, phone } = req.body;
  const user = await contModel.create({
    name: name,
    email: email,
    phoneNumber: phone,
  });
  res.redirect("/index");
=======
  const { email, name, msg} = req.body;

  try {
    //  contModel is a Mongoose model
    await contModel.create({ name, email, msg });

    // Clear any existing flash messages
    req.flash("success", "");
    req.flash("error", ""); 

    // Set a success flash message
    req.flash("success", "Your data has been recorded successfully!");
  } catch (error) {
    // Clear any existing flash messages
    req.flash("success", "");
    
    // Set an error flash message if there's an issue
    req.flash("error", "There was an error recording your data.");
  }

  // Redirect to the home page
  res.redirect("/");
>>>>>>> 7db83f896533a512bfd8a6a89c421456781b3e9d
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

  userModel
    .register(userData, password)
    .then(() => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    })
    .catch((error) => {
      let errorMessage = error.message;

      // Check if the error is a MongoDB duplicate key error
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        errorMessage =
          "Email already in use. Please choose a different email address.";
      }

      res.render("signup", { error: errorMessage });

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
