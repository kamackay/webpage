import bodyParser from "body-parser";
import express from "express";
import math from "mathjs";
const app = express();
app.use(bodyParser.json());
const router = express.Router();
import request from "request";
import _ from "./_";
request.defaults({ encoding: null });

router.post(["*"], (req, response, next) => {
	try {
		const data = req.body;
		if (data && data.type) {
			switch (data.type) {
				case "image":
					const url = data.url;
					convertImageToBase64(url, (data64: string) => {
						const o = {
							data: data64,
							url,
						 };
						response.json(o);
					});
					return;
			}
		} else {
			if (data) { _.log("Data", _.s(data)); }
			_.log("Received Unknown request format");
			response.status(400).send("Unsure what to do with this request");
		}
	} catch (e) {
		_.err(e);
		response.status(500).json(e);
	}
});

function convertImageToBase64(url: string, func: (data: string) => void) {
	request.get(url, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			const data = "data:" +
				response.headers["content-type"] +
				";base64," +
				new Buffer(body).toString("base64");
			if (typeof func === "function") { func(data); }
		} else {
			_.log("Error");
		}
	});
}

export default router;
