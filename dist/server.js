"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const _1 = __importDefault(require("./_"));
const convert_1 = __importDefault(require("./convert"));
const format_1 = __importDefault(require("./format"));
const holidays_1 = __importDefault(require("./holidays"));
const math_1 = __importDefault(require("./math"));
const modules = {
    convert: convert_1.default,
    format: format_1.default,
    holidays: holidays_1.default,
    math: math_1.default,
};
const app = express_1.default();
const router = express_1.default.Router();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
_1.default.keys(modules).forEach((key) => {
    app.use("/" + key, modules[key]);
    _1.default.log('Loaded Module "' + key + '"');
});
app.all(["/version", "/version/*"], (req, res, next) => {
    const o = { version: _1.default.version };
    res.json(o);
    _1.default.log(o);
    next();
});
app.listen(5000, () => {
    _1.default.log("Client now running on port 5000 (" + _1.default.getDateStr() + ")\n");
});
exports.default = app;
//# sourceMappingURL=server.js.map