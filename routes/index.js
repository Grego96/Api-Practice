const userRoutes = require("./userRoutes");
const todoRoutes = require("./todoRoutes");

module.exports = (app) => {
  app.use(userRoutes);
  app.use(todoRoutes);
};
