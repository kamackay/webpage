import express from "express";
import math from "mathjs";
const app = express();
const router = express.Router();
import _ from "./_";

router.post("/", (request, response, next) => {
	try {
		const data = request.body;
		if (data && data.type) {
			switch (data.type) {
				case "math":
					// Use the math API
					const mathQuery = data.query;
					let answer = math.eval(mathQuery);
					answer = answer === Infinity ? "&infin;" : answer;
					_.sendJSON(response, {
						answer,
						question: mathQuery,
					});
					_.log(
						"Math Query",
						_.s({
							answer,
							question: mathQuery,
						}),
					);
					next();
					return;
				case "formatMath":
					const str = data.str;
					const formatStr = _.prettyPrint(str);
					_.log(
						"Request To Pretty Print Math String",
						_.s({
							formatted: formatStr,
							original: str,
						}),
					);
					_.sendJSON(response, { formatted: formatStr });
					next();
					return;
			}
		} else {
			if (data) {
				_.log("Data", _.s(data));
			}
			_.log("Received Unknown request format");
			response.status(400).send("Unsure what to do with this request");
		}
	} catch (e) {
		_.err(e);
		response.status(500).json(e);
	}
	next();
});

export default router;
