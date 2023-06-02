const { User } = require("../models");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  if (req.body.email && req.body.password) {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      const compare = await user.validatePassword(req.body.password);
      if (compare) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_STRING);
        const userInfo = await User.findOne({
          where: { email: req.body.email },
          attributes: ["id", "email", "isAdmin"],
        });
        res.status(200).json({ token: token, user: userInfo });
      } else {
        res.status(400).json({ message: "Invalid credentials." });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials." });
    }
  } else {
    res.status(400).json({ message: "A field is missing" });
  }
}

async function register(req, res) {
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: req.body.email,
      },
      defaults: {
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
      },
    });
    if (created) {
      res.status(201).json({ message: "User created!" });
    } else {
      res.status(400).json({ message: "Email already exist." });
    }
  } catch (error) {
    res.status(400).json({ message: "A field is missing", error: error });
    return;
  }
}

async function index(req, res) {
  const users = await User.findAll();
  res.status(200).json({ users });
}

module.exports = {
  login,
  register,
  index,
};
