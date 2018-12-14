"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_beautify_1 = __importDefault(require("js-beautify"));
class HelperObject {
    constructor() {
        this.version = "1.0.2";
        this.encode = encodeURIComponent;
    }
    err(err) {
        if (typeof err !== "undefined") {
            this.log("Unexpected Error", this.s(err));
        }
    }
    s(o) {
        return JSON.stringify(o, null, 4);
    }
    prettyPrint(str) {
        try {
            if (str) {
                return js_beautify_1.default.js_beautify(str);
            }
            else {
                return "";
            }
        }
        catch (err) {
            this.log("Error Pretty Printing JS", err);
            return null;
        }
    }
    log(...args) {
        // Shorten the variable so that nothing printed is too large
        const s = (o) => {
            if (o && typeof o === "string" && o.length > 100000) {
                return o.substr(5000) + "...";
            }
            else {
                return o;
            }
        };
        const t = (o) => {
            switch (typeof o) {
                case "undefined":
                    return;
                case "string":
                    return s(o);
                case "object":
                    return s(s(o));
            }
        };
        console.log(...args.map(t));
    }
    serialize(o) {
        let s = "?";
        this.keys(o).forEach((k) => {
            s += this.encode(k) + "=" + this.encode(o[k]);
        });
        return s;
    }
    combineObj(a, b, overwrite) {
        this.keys(a).forEach((k) => {
            if (overwrite || !a[k] !== undefined) {
                a[k] = b[k];
            }
        });
        return a;
    } /**/
    padNumStr(s, n = 2) {
        n = n || 2;
        while (s.length < n) {
            s = "0" + s;
        }
        return s;
    }
    getDateStr(date = new Date()) {
        date = date || new Date();
        return (date.getFullYear() +
            "-" +
            this.padNumStr((date.getMonth() + 1).toString()) +
            "-" +
            this.padNumStr("" + date.getDate()) +
            " " +
            this.padNumStr("" + date.getHours()) +
            ":" +
            this.padNumStr("" + date.getMinutes()) +
            ":" +
            this.padNumStr("" + date.getSeconds()));
    }
    convertToString(n) {
        return "" + n;
    }
    keys(obj) {
        return Object.keys(obj);
    }
    sendJSON(resp, obj, startTime = null) {
        obj.appVersion = this.version;
        resp.json(obj);
        if (startTime) {
            this.log("Response in " +
                (this.getTime() - startTime).toString() +
                " ms");
        }
    }
    getTime() {
        return new Date().getTime();
    }
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    randNum(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}
// declare let _: HelperObject;
exports.default = new HelperObject();
//# sourceMappingURL=_.js.map