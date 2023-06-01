const { User } = require("../models");

const db = require("../models");

async function index(req, res) {
  const users = await User.findAll();
  res.status(200).json({ users });
}

module.exports = {
  index,
};
