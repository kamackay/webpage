import bodyParser from "body-parser";
import express from "express";
import _ from "./_";
import convert from "./convert";
import format from "./format";
import holidays from "./holidays";
import math from "./math";

const modules: {[k: string]: any} = {
	convert,
	format,
	holidays,
	math,
};

const app = express();
const router = express.Router();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
_.keys(modules).forEach((key: string) => {
    app.use("/" + key, modules[key]);
    _.log('Loaded Module "' + key + '"');
});
app.all(["/version", "/version/*"], (req, res, next) => {
    const o = { version: _.version };
    res.json(o);
    _.log(o);
});

app.listen(5000, () => {
    _.log("Client now running on port 5000 (" + _.getDateStr() + ")\n");
});

export default app;
