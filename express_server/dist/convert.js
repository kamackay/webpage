"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(body_parser_1.default.json());
const router = express_1.default.Router();
const request_1 = __importDefault(require("request"));
const _1 = __importDefault(require("./_"));
request_1.default.defaults({ encoding: null });
router.post(["*"], (req, response, next) => {
    try {
        const data = req.body;
        if (data && data.type) {
            switch (data.type) {
                case "image":
                    const url = data.url;
                    convertImageToBase64(url, (data64) => {
                        const o = {
                            data: data64,
                            url,
                        };
                        response.json(o);
                    });
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
});
function convertImageToBase64(url, func) {
    request_1.default.get(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = "data:" +
                response.headers["content-type"] +
                ";base64," +
                new Buffer(body).toString("base64");
            if (typeof func === "function") {
                func(data);
            }
        }
        else {
            _1.default.log("Error");
        }
    });
}
exports.default = router;
//# sourceMappingURL=convert.js.map