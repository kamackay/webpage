"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _1 = __importDefault(require("./_"));
const app = express_1.default();
const router = express_1.default.Router();
const staticData = __importStar(require("./data/holidays.json"));
// router.post('/', holidayReq);
router.all("/*", (request, response, next) => {
    const start = _1.default.getTime();
    try {
        const urlS = request.url.split("/");
        _1.default.log(urlS);
        const urlInfo = [];
        urlS.filter((url) => url !== "")
            .forEach((url) => {
            urlInfo.push(url);
        });
        if (urlInfo.length >= 1 && urlInfo[0].length <= 2) {
            const month = parseInt(urlInfo[0], 10);
            _1.default.log(`All holidays in the ${month}th month`);
            const year = urlInfo.length >= 2
                ? parseInt(urlInfo[1], 10)
                : new Date().getFullYear();
            const hols = getHolidays(month, year);
            _1.default.sendJSON(response, hols, start);
            _1.default.log(hols);
        }
        else {
            let h = [];
            const year = urlInfo.length >= 1 && urlInfo[0].length === 4
                ? parseInt(urlInfo[0], 10)
                : new Date().getFullYear();
            for (let i = 0; i < 12; i++) {
                h = h.concat(getHolidays(i, year));
            }
            _1.default.log("All Holidays in " + year.toString(), h);
            _1.default.sendJSON(response, h, start);
        }
        next();
    }
    catch (e) {
        _1.default.err(e);
        response.status(500).json(e);
    }
});
function getHolidays(month, year) {
    const o = [];
    staticData.holidays.forEach((h) => {
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
}
function getEaster(year) {
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
exports.default = router;
//# sourceMappingURL=holidays.js.map