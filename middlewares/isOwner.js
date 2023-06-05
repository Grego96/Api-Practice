const { Todo } = require("../models");

module.exports = async function (req, res, next) {
  const todo = await Todo.findByPk(req.params.id || req.query.id);
  if (req.auth.id === todo.userId) {
    next();
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
};
