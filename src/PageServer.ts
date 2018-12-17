import bodyParser from "body-parser";
import express from "express";
import * as core from "express-serve-static-core";
import _ from "./_";
import IServer from "./IServer";

class PageServer implements IServer {
	private app: core.Express;

	constructor() {
		this.configure();
	}

	public configure(): void {

		this.app = express();

		this.app.use((req, res, next) => {
			_.log(`${req.method} on ${req.url} - PAGE`);
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
		this.app.use("/static", express.static("static"));
		this.app.use(bodyParser.json());

	}
	public start(port: number): void {
		this.app.listen(port, () => {
			_.log(`Page Server now running on port ${port}`);
		});
	}
}

export default PageServer;
