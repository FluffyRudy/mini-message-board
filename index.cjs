const express = require("express");
const { resolve } = require("node:path");
const { PORT, ROUTES, messages } = require("./constants.cjs");

require("dotenv").config();

const app = express();

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(resolve(__dirname, "public")));
app.use(express.json());

app.get(ROUTES.root, (req, res) => {
  res.render("index", { messages });
});

app.get(ROUTES.newMessage, (req, res) => {
  res.render("new");
});

app.post(ROUTES.newMessage, (req, res) => {
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Listening at: http://127.0.0.1:${PORT}`);
});
