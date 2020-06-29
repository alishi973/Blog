const express = require("express");
const app = express();

app.get("/login", (req, res) => {
  res.send({ name: "haji" });
});

app.listen(80);
