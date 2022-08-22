"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpirationDateByDaysSkippingWeekendsAndHolidays = void 0;
const date_fns_1 = require("date-fns");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const holidayJsonPath = (0, path_1.resolve)(__dirname, "holidays.json");
const holidayJson = fs_1.default.readFileSync(holidayJsonPath, "utf8");
const formatDate = (date, design) => {
    return (0, date_fns_1.format)(date, design);
};
const sumBusinessDays = (date, num) => {
    return (0, date_fns_1.addBusinessDays)(date, num);
};
const sumHours = (date, hours) => {
    return (0, date_fns_1.addHours)(date, hours);
};
const subHours = (date, hours) => {
    return (0, date_fns_1.subHours)(date, hours);
};
const getWeekdayNumber = (date) => {
    return date.getDay();
};
const verifyHoliday = async (date) => {
    const dateToFind = sumHours(date, 3);
    const formattedDateToFind = formatDate(dateToFind, "yyyy-MM-dd'T'00:00:00");
    const findHolidayByDate = JSON.parse(holidayJson).find((holiday) => holiday.date === formattedDateToFind);
    if (findHolidayByDate) {
        const newDate = sumBusinessDays(date, 1);
        return verifyHoliday(newDate);
    }
    return date;
};
const getExpirationDateByDaysSkippingWeekendsAndHolidays = async (expirationIn) => {
    const SUNDAY = 0;
    const SATURDAY = 6;
    const billetExpirationDate = sumHours(new Date(), 3);
    const dateSkippingWeekends = sumBusinessDays(billetExpirationDate, expirationIn);
    const fromDate = sumHours(billetExpirationDate, 6);
    const toDate = sumHours(dateSkippingWeekends, 6);
    const formattedFromDate = formatDate(fromDate, "yyyy-MM-dd'T'HH:mm:ss");
    const formattedToDate = formatDate(toDate, "yyyy-MM-dd'T'HH:mm:ss");
    const holidaysWithinPeriod = JSON.parse(holidayJson).filter((holiday) => {
        return (holiday.date >= formattedFromDate && holiday.date <= formattedToDate);
    });
    const holidayWeekdayNumbers = holidaysWithinPeriod.map((holyday) => getWeekdayNumber(sumHours(holyday, 3)));
    const workingDayHolidays = holidayWeekdayNumbers.filter((weekday) => weekday !== SUNDAY && weekday !== SATURDAY).length;
    const dateSkippingWeekendsAndHolidays = sumBusinessDays(dateSkippingWeekends, workingDayHolidays);
    const date = await verifyHoliday(dateSkippingWeekendsAndHolidays);
    const dateSubHours = subHours(date, 3);
    const formattedDate = formatDate(dateSubHours, "yyyy-MM-dd'T'HH:mm");
    return formattedDate;
};
exports.getExpirationDateByDaysSkippingWeekendsAndHolidays = getExpirationDateByDaysSkippingWeekendsAndHolidays;
//# sourceMappingURL=date.js.map