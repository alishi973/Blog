const express = require("express");
const app = express();
const Routes = require("./Routes");
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");

app.use(BodyParser.json({extended:1}));
app.use(CookieParser());

app.use("/posts", Routes.Posts);


app.listen(80);
