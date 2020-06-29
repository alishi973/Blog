require("dotenv").config();
require("./Models");
const express = require("express");
const app = express();
const Routes = require("./Routes");
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");

app.use(BodyParser.json({ extended: 1 }));
app.use(CookieParser());

app.use("/common", Routes.Commons);
app.use("/posts", Routes.Posts);
app.use("/auth", Routes.Auths);

app.use("/static/images",express.static("uploads/images"))

app.listen(process.env.PORT);
