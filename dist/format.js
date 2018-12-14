"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uglify_js_1 = __importDefault(require("uglify-js"));
const app = express_1.default();
const router = express_1.default.Router();
const _1 = __importDefault(require("./_"));
router.post("/", (request, response, next) => {
    try {
        const data = request.body;
        if (data && data.type) {
            const str = data.str;
            switch (data.type) {
                case "code-js":
                    const formattedStr = _1.default.prettyPrint(str);
                    _1.default.log("Request To Pretty Print JS String", _1.default.s({
                        formatted: formattedStr,
                        original: str,
                    }));
                    _1.default.sendJSON(response, { formatted: formattedStr });
                    return;
                case "math":
                    const formatStr = _1.default.prettyPrint(str);
                    _1.default.log("Request To Pretty Print Math String", _1.default.s({
                        formatted: formatStr,
                        original: str,
                    }));
                    _1.default.sendJSON(response, { formatted: formatStr });
                    next();
                    return;
                case "minify":
                    _1.default.log({ request: "Minify Code", code: str });
                    const minStr = uglify_js_1.default.minify(str, {}).code;
                    _1.default.sendJSON(response, { result: minStr });
                    _1.default.log({ result: minStr });
                    next();
                    return;
            }
        }
        else {
            if (data) {
                _1.default.log("Data", _1.default.s(data));
            }
            _1.default.log("Received Unknown request format");
            response.status(400).send("Unsure what to do with this request");
        }
    }
    catch (e) {
        _1.default.err(e);
        response.status(500).json(e);
    }
    next();
});
exports.default = router;
//# sourceMappingURL=format.js.map