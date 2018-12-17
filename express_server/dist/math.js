"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mathjs_1 = __importDefault(require("mathjs"));
const app = express_1.default();
const router = express_1.default.Router();
const _1 = __importDefault(require("./_"));
router.post("/", (request, response, next) => {
    try {
        const data = request.body;
        if (data && data.type) {
            switch (data.type) {
                case "math":
                    // Use the math API
                    const mathQuery = data.query;
                    let answer = mathjs_1.default.eval(mathQuery);
                    answer = answer === Infinity ? "&infin;" : answer;
                    _1.default.sendJSON(response, {
                        answer,
                        question: mathQuery,
                    });
                    _1.default.log("Math Query", _1.default.s({
                        answer,
                        question: mathQuery,
                    }));
                    next();
                    return;
                case "formatMath":
                    const str = data.str;
                    const formatStr = _1.default.prettyPrint(str);
                    _1.default.log("Request To Pretty Print Math String", _1.default.s({
                        formatted: formatStr,
                        original: str,
                    }));
                    _1.default.sendJSON(response, { formatted: formatStr });
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
//# sourceMappingURL=math.js.map