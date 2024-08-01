require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

require("./config/db.js");

const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
  console.log("App rodando na porta", port);
});
