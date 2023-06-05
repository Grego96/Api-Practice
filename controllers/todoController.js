const { Todo } = require("../models");

async function index(req, res) {
  const todos = await Todo.findAll({ where: { userId: req.auth.id } });
  if (todos.length >= 1) {
    res.status(200).json({ todos });
  } else {
    res.status(404).json({ message: "No todo found" });
  }
}

async function show(req, res) {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) {
    res.status(200).json({ todo });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
}

async function store(req, res) {
  try {
    const newTodo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.auth.id,
    });
    if (newTodo) {
      res.status(201).json({ message: "Todo created" });
    } else {
      res.status(400).json({ message: "A Todo with that Title already exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
}

async function edit(req, res) {
  const todo = await Todo.findByPk(req.query.id || req.params.id);
  if (todo && todo.id) {
    try {
      await todo.update({ ...req.body });
      res.status(200).json({ message: "Todo updated." });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.status(402).json({ message: "Todo not found" });
  }
}

async function destroy(req, res) {
  const todo = await Todo.findByPk(req.query.id || req.params.id);
  if (todo) {
    await todo.destroy();
    res.status(200).json({ message: "Todo deleted." });
  } else {
    res.status(400).json({ message: "Todo not found." });
  }
}

module.exports = {
  index,
  show,
  store,
  edit,
  destroy,
};
