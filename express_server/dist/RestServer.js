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
class RestServer {
    constructor() {
        this.configure();
    }
    configure() {
        this.modules = {
            convert: convert_1.default,
            format: format_1.default,
            holidays: holidays_1.default,
            math: math_1.default,
        };
        this.app = express_1.default();
        this.app.use((req, res, next) => {
            _1.default.log(`${req.method} on ${req.url} - REST`);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(body_parser_1.default.urlencoded({
            extended: true,
        }));
        this.app.use(body_parser_1.default.json());
        _1.default.keys(this.modules).forEach((key) => {
            this.app.use("/" + key, this.modules[key]);
            _1.default.log('Loaded Module "' + key + '"');
        });
        this.app.all(["/version", "/version/*"], (req, res, next) => {
            const o = { version: _1.default.version };
            res.json(o);
            _1.default.log(o);
            next();
        });
    }
    start(port) {
        this.app.listen(port, () => {
            _1.default.log(`Rest Server now running on port ${port}`);
        });
    }
}
exports.default = RestServer;
//# sourceMappingURL=RestServer.js.map