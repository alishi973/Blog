const express = require("express");
const app = express();
const Routes = require("./Routes");

app.use("/posts", Routes.Posts);

app.listen(80);
