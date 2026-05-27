/*const express =
  require("express");

const router =
  express.Router();

const {

  signupUser,

  loginUser,

} = require(
  "../controllers/authController"
);

router.post(
  "/signup",
  signupUser
);

router.post(
  "/login",
  loginUser
);

module.exports = router;*/
const express =
  require("express");

const router =
  express.Router();

const {
  signup,
  login,
} = require(
  "../controllers/authController"
);

/* ROUTES */

router.post(
  "/signup",
  signup
);

router.post(
  "/login",
  login
);

module.exports =
  router;