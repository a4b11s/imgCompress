const express = require('express');
const compressFiles = require('../services/compress');
const router = express.Router();

router.post('/', function (req, res) {
  try {
    if (req.files) {
      compressFiles(Object.values(req.files)).then((data) => {
        res.type('application/zip');
        res.send(data);
      });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
