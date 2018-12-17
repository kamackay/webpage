import express from "express";
import uglify from "uglify-js";
const app = express();
const router = express.Router();
import _ from "./_";

router.post("/", (request, response, next) => {
	try {
		const data = request.body;
		if (data && data.type) {
			const str = data.str;
			switch (data.type) {
				case "code-js":
					const formattedStr = _.prettyPrint(str);
					_.log(
						"Request To Pretty Print JS String",
						_.s({
							formatted: formattedStr,
							original: str,
						}),
					);
					_.sendJSON(response, { formatted: formattedStr });
					return;
				case "math":
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
				case "minify":
					_.log({ request: "Minify Code", code: str });
					const minStr = uglify.minify(str, {}).code;
					_.sendJSON(response, { result: minStr });
					_.log({ result: minStr });
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
