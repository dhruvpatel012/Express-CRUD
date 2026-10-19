const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("welcome to express page");
});

app.get("/home", (req, res) => {
  res.end("Home page");
});

app.get("/about", (req, res) => {
  res.end("About page");
});

app.listen(1201, () => {
  console.log("server is running on port 1201");
});
