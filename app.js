const consign = require("consign");
const express = require("express");
const app = express();

consign()
  .include("config/middlewares.js")
  .then("config/server.js")
  .then("config/pool_conexoes.js")
  .then("app/models")
  .then("app/controllers")
  .then("app/routes")
  .into(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor online...\nhttp://localhost:${process.env.APP_PORT}`);
});