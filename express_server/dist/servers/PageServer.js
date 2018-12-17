"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const _1 = __importDefault(require("../_"));
class PageServer {
    constructor() {
        this.configure();
    }
    configure() {
        this.app = express_1.default();
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(body_parser_1.default.urlencoded({
            extended: true,
        }));
        this.app.use("/static", express_1.default.static("..\\static"));
        this.app.use(body_parser_1.default.json());
    }
    start(port) {
        this.app.listen(port, () => {
            _1.default.log(`Page Server now running on port ${port} (${_1.default.getDateStr()})\n`);
        });
    }
}
exports.default = PageServer;
//# sourceMappingURL=PageServer.js.map