const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileUpload = require("express-fileupload");

const imgRouter = require("./routes/img");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/img", imgRouter);

module.exports = app;
