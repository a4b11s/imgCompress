const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const imgRouter = require('./routes/img');
const {accessControl} = require("./middleware/accessControl");

const app = express();

const port = parseInt(process.env.PORT || '3002');
app.use(logger('dev'));

app.use(express.json());
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(accessControl);
app.use('/api/img', imgRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
