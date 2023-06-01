const db = require("./models");

module.exports = async () => {
  // Crear tablas:
  await db.sequelize.sync({ force: true });
  await require("./seeders/userSeeders")();
  console.log("[Database] ¡Las tablas fueron creadas!");
};
