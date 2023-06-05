require("dotenv").config();

const express = require("express");
const APP_PORT = 8080 || process.env.port;
// const dbInitialSetup = require("./dbInitialSetup");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes");

routes(app);

// dbInitialSetup();

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
