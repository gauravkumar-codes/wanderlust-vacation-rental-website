const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
    .get(userController.renderSignUpForm)      // Sign Up Form Route
    .post(wrapAsync(userController.signUp));    // Sign Up Route

router.route("/login")
    .get(userController.renderLogInForm)      // Log In Form Route
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.logIn          
);         // Log In Route

// Log Out Route
router.get("/logout", userController.logOut);

module.exports = router;