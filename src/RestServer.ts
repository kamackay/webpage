import bodyParser from "body-parser";
import express from "express";
import * as core from "express-serve-static-core";
import _ from "./_";
import convert from "./convert";
import format from "./format";
import holidays from "./holidays";
import IServer from "./IServer";
import math from "./math";
import JsObject from "./model/JsObject";

class RestServer implements IServer {
	private modules: JsObject;
	private app: core.Express;

	constructor() {
		this.configure();
	}

	public configure(): void {
		this.modules = {
			convert,
			format,
			holidays,
			math,
		};

		this.app = express();

		this.app.use((req, res, next) => {
			_.log(`${req.method} on ${req.url} - REST`);
			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept",
			);
			next();
		});
		this.app.use(
			bodyParser.urlencoded({
				extended: true,
			}),
		);
		this.app.use(bodyParser.json());
		_.keys(this.modules).forEach((key: string) => {
			this.app.use("/" + key, this.modules[key]);
			_.log('Loaded Module "' + key + '"');
		});
		this.app.all(["/version", "/version/*"], (req, res, next) => {
			const o = { version: _.version };
			res.json(o);
			_.log(o);
			next();
		});
	}
	public start(port: number): void {
		this.app.listen(port, () => {
			_.log(`Rest Server now running on port ${port}`);
		});
	}
}

export default RestServer;
