"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PageServer_1 = __importDefault(require("./PageServer"));
const RestServer_1 = __importDefault(require("./RestServer"));
const pageServer = new PageServer_1.default();
exports.pageServer = pageServer;
pageServer.start(1500);
const restServer = new RestServer_1.default();
exports.restServer = restServer;
restServer.start(5000);
//# sourceMappingURL=server.js.map