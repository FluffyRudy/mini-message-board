const express = require("express");
const { resolve } = require("node:path");
const { PORT, messages } = require("./constants.cjs");

require("dotenv").config();

const app = express();

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { messages });
});

app.get("/new", (req, res) => {
  console.log(req.body);
  res.render("new");
});

app.post("/new", (req, res) => {
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Listening at: http://127.0.0.1:${PORT}`);
});
