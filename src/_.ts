import { Response } from "express";
import jsFormatter from "js-beautify";

class HelperObject {
	public readonly version = "1.0.2";
	public readonly encode = encodeURIComponent;

	public err(err: Error): void {
		if (typeof err !== "undefined") {
			this.log("Unexpected Error", this.s(err));
		}
	}

	public s(o: object): string {
		return JSON.stringify(o, null, 4);
	}

	public prettyPrint(str: string): string {
		try {
			if (str) {
				return jsFormatter.js_beautify(str);
			} else {
				return "";
			}
		} catch (err) {
			this.log("Error Pretty Printing JS", err);
			return null;
		}
	}

	public log(...args: any[]): void {
		// Shorten the variable so that nothing printed is too large
		const s = (o: any) => {
			if (o && typeof o === "string" && o.length > 100000) {
				return o.substr(5000) + "...";
			} else {
				return o;
			}
		};
		const t = (o: any) => {
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

	public serialize(o: any) {
		let s = "?";
		this.keys(o).forEach((k: string) => {
			s += this.encode(k) + "=" + this.encode(o[k]);
		});
		return s;
	}

	// TODO figure this hot shit out
	/*
	public combineObj(a: object, b: object, overwrite: boolean) {
		this.keys(a).forEach((k: string) => {
			if (overwrite || !a[k] !== undefined) {
				a[k] = b[k];
			}
		});
		return a;
	}/**/

	public padNumStr(s: string, n: number = 2): string {
		n = n || 2;
		while (s.length < n) {
			s = "0" + s;
		}
		return s;
	}

	public getDateStr(date: Date = new Date()): string {
		date = date || new Date();
		return (
			date.getFullYear() +
			"-" +
			this.padNumStr((date.getMonth() + 1).toString()) +
			"-" +
			this.padNumStr("" + date.getDate()) +
			" " +
			this.padNumStr("" + date.getHours()) +
			":" +
			this.padNumStr("" + date.getMinutes()) +
			":" +
			this.padNumStr("" + date.getSeconds())
		);
	}

	public convertToString(n: number) {
		return "" + n;
	}

	public keys(obj: object): string[] {
		return Object.keys(obj);
	}

	public sendJSON(resp: Response, obj: {[k: string]: any}, startTime: number = null) {
		obj.appVersion = this.version;
		resp.json(obj);
		if (startTime) {
			this.log(
				"Response in " +
					(this.getTime() - startTime).toString() +
					" ms");
		}
	}

	public getTime(): number {
		return new Date().getTime();
	}

	public randInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	public randNum(min: number, max: number): number {
		return Math.random() * (max - min + 1) + min;
	}
}

// declare let _: HelperObject;

export default new HelperObject();
