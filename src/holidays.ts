import express from "express";
import _ from "./_";
const app = express();
const router = express.Router();
import * as staticData from "./data/holidays.json";
import { Holiday, SimpleDate } from "./model/holiday";

// router.post('/', holidayReq);
router.all("/*", (request, response, next) => {
	const start = _.getTime();
	try {
		const urlS = request.url.split("/");
		_.log(urlS);
		const urlInfo: string[] = [];

		urlS.filter((url) => url !== "")
			.forEach((url) => {
				urlInfo.push(url);
			});
		if (urlInfo.length >= 1 && urlInfo[0].length <= 2) {
			const month = parseInt(urlInfo[0], 10);
			_.log(`All holidays in the ${month}th month`);
			const year =
				urlInfo.length >= 2
					? parseInt(urlInfo[1], 10)
					: new Date().getFullYear();
			const hols = getHolidays(month, year);
			_.sendJSON(response, hols, start);
			_.log(hols);
		} else {
			let h: object[] = [];
			const year =
				urlInfo.length >= 1 && urlInfo[0].length === 4
					? parseInt(urlInfo[0], 10)
					: new Date().getFullYear();
			for (let i = 0; i < 12; i++) {
				h = h.concat(getHolidays(i, year));
			}
			_.log("All Holidays in " + year.toString(), h);
			_.sendJSON(response, h, start);
		}
		next();
	} catch (e) {
		_.err(e);
		response.status(500).json(e);
	}
});

function getHolidays(month: number, year: number): Holiday[] {
	const o: Holiday[] = [];
	(staticData as any).holidays.forEach((h: any) => {
		if (h.date.month === month) {
			o.push(h);
		}
	});
	const easter = getEaster(year);
	if (easter.month === month) {
		o.push({
			date: {
				day: easter.day,
				month: easter.month,
			},
			link: "https://en.wikipedia.org/wiki/Easter",
			name: "Easter Day",
		});
	}
	return o;
}

// Dummy object
class Temp {
	public c: number;
	public n: number;
	public k: number;
	public i: number;
	public j: number;
	public l: number;
	public m: number;
	public d: number;
}

function getEaster(year: number): SimpleDate {
	const temp = new Temp();
	temp.c = Math.floor(year / 100);
	temp.n = year - 19 * Math.floor(year / 19);
	temp.k = Math.floor((temp.c - 17) / 25);
	temp.i =
		temp.c -
		Math.floor(temp.c / 4) -
		Math.floor((temp.c - temp.k) / 3) +
		19 * temp.n +
		15;
	temp.i = temp.i - 30 * Math.floor(temp.i / 30);
	temp.i =
		temp.i -
		Math.floor(temp.i / 28) *
			(1 -
				Math.floor(temp.i / 28) *
					Math.floor(29 / (temp.i + 1)) *
					Math.floor((21 - temp.n) / 11));
	temp.j =
		year +
		Math.floor(year / 4) +
		temp.i +
		2 -
		temp.c +
		Math.floor(temp.c / 4);
	temp.j = temp.j - 7 * Math.floor(temp.j / 7);
	temp.l = temp.i - temp.j;
	temp.m = 3 + Math.floor((temp.l + 40) / 44);
	temp.d = temp.l + 28 - 31 * Math.floor(temp.m / 4);
	return { month: temp.m, day: temp.d };
}

export default router;
