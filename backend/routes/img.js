const express = require("express");
const JSZip = require("jszip");
const router = express.Router();

async function filesArray2Zip(filesArray, zip) {
	await filesArray.map((item) => {
		zip.file(item.name, item.data);
	});
}

router.post("/", async function (req, res, next) {
	res.set("Access-Control-Allow-Origin", "*");
	if (req.files) {
		const files = Object.values(req.files);
		const zip = new JSZip();

		await filesArray2Zip(files, zip).then(() => {
			zip.generateAsync({ type: "blob" }).then((content) => {
				res.type(content.type);
				content.arrayBuffer().then((buf) => {
					res.send(Buffer.from(buf));
				});
			});
		});
	}
});

module.exports = router;
