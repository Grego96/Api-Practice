const express = require("express");
const routes = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const verifyJwt = jwt({
  secret: process.env.JWT_SECRET_STRING,
  algorithms: ["HS256"],
});
const userController = require("../controllers/userController");
const adminAccess = require("../middlewares/adminUserAccess");

routes.get("/users", verifyJwt, adminAccess, userController.index);
routes.post("/register", userController.register);

module.exports = routes;
