const express = require("express");
const { resolve, default: path } = require("node:path");
const { PORT } = require("./constants.cjs");
const { messageDB } = require("./db.cjs");

require("dotenv").config();

const app = express();

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { messages: messageDB.messages });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res, next) => {
  try {
    const { message, user } = req.body;
    messageDB.addMessage(user, message);
  } catch (err) {
    next(err);
  }
  res.redirect("/");
});

app.get("/msg/:id", (req, res) => {
  const idParam = Number(req.params.id);
  if (!idParam) {
    res.send("400 bad request");
    return;
  }
  const data = messageDB.getMessage(idParam);
  if (!data) {
    res.send("404 not found");
    return;
  }
  res.render("message", { data });
});

app.get("/data", (req, res) => {
  res.json(messageDB.messages);
});
app.listen(PORT, () => {
  console.log(`Listening at: http://127.0.0.1:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err.name);
});
