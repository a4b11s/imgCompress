const express = require("express");
const compressFiles = require("../services/compress");
const router = express.Router();


router.post("/", function (req, res, next) {
	res.set("Access-Control-Allow-Origin", "*");
	try {
		if (req.files) {
			compressFiles(Object.values(req.files)).then(data=>{
				console.log(data)
				res.type("application/zip")
				res.send(data)
			})
		}
	}catch (e){
		console.log(e)
		res.sendStatus(500)
	}
});

module.exports = router;
