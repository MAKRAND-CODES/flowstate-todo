/*const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

/* GENERATE JWT */
/*const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
*/
/* SIGNUP */
/*exports.signupUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {

        return res.status(400)
          .json({
            message:
              "User already exists",
          });
      }

      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

        });

      res.status(201).json({

        _id: user._id,

        name: user.name,

        email: user.email,

        token:
          generateToken(
            user._id
          ),

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};
*/


/* LOGIN */
/*exports.loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (
        user &&
        (
          await bcrypt.compare(
            password,
            user.password
          )
        )
      ) {

        res.json({

          _id: user._id,

          name: user.name,

          email: user.email,

          token:
            generateToken(
              user._id
            ),

        });

      } else {

        res.status(401)
          .json({
            message:
              "Invalid credentials",
          });
      }

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};*/

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* ================= SIGNUP ================= */

exports.signup = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
    } = req.body;

    /* CHECK USER */
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    /* HASH PASSWORD */
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    /* CREATE USER */
    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    /* JWT TOKEN */
    const token =
      jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });

  }
};

/* ================= LOGIN ================= */

exports.login = async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    /* FIND USER */
    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid Credentials",
      });
    }

    /* CHECK PASSWORD */
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Credentials",
      });
    }

    /* JWT TOKEN */
    const token =
      jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });

  }
};