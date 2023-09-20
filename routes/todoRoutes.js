const express = require("express");
const routes = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const verifyJwt = jwt({
  secret: process.env.JWT_SECRET_STRING,
  algorithms: ["HS256"],
});
const isOwner = require("../middlewares/isOwner");
const todoController = require("../controllers/todoController");

routes.get("/todos", verifyJwt, todoController.index);
routes.post("/todos", verifyJwt, todoController.store);
routes.get("/todos/:id", verifyJwt, isOwner, todoController.show);
routes.post("/todos/:id", verifyJwt, isOwner, todoController.edit);
routes.delete("/todos/:id", verifyJwt, isOwner, todoController.destroy);

module.exports = routes;
