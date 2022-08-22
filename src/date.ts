import {
  addBusinessDays,
  format,
  addHours,
  subHours as subHoursFunc,
} from "date-fns";
import fs from "fs";
import { resolve } from "path";

const holidayJsonPath = resolve(__dirname, "holidays.json");
const holidayJson = fs.readFileSync(holidayJsonPath, "utf8");

const formatDate = (date: Date, design: string) => {
  return format(date, design);
};

const sumBusinessDays = (date: Date, num: number) => {
  return addBusinessDays(date, num);
};

const sumHours = (date: Date, hours: number) => {
  return addHours(date, hours);
};

const subHours = (date: Date, hours: number) => {
  return subHoursFunc(date, hours);
};

const getWeekdayNumber = (date: Date) => {
  return date.getDay();
};

const verifyHoliday = async (date: Date): Promise<Date> => {
  const dateToFind = sumHours(date, 3);
  const formattedDateToFind = formatDate(dateToFind, "yyyy-MM-dd'T'00:00:00");

  const findHolidayByDate = JSON.parse(holidayJson).find(
    (holiday: any) => holiday.date === formattedDateToFind
  );

  if (findHolidayByDate) {
    const newDate = sumBusinessDays(date, 1);
    return verifyHoliday(newDate);
  }

  return date;
};

export const getExpirationDateByDaysSkippingWeekendsAndHolidays = async (
  expirationIn: number
): Promise<string> => {
  const SUNDAY = 0;
  const SATURDAY = 6;

  const billetExpirationDate = sumHours(new Date(), 3);

  const dateSkippingWeekends = sumBusinessDays(
    billetExpirationDate,
    expirationIn
  );

  const fromDate = sumHours(billetExpirationDate, 6);
  const toDate = sumHours(dateSkippingWeekends, 6);

  const formattedFromDate = formatDate(fromDate, "yyyy-MM-dd'T'HH:mm:ss");
  const formattedToDate = formatDate(toDate, "yyyy-MM-dd'T'HH:mm:ss");

  const holidaysWithinPeriod = JSON.parse(holidayJson).filter(
    (holiday: any) => {
      return (
        holiday.date >= formattedFromDate && holiday.date <= formattedToDate
      );
    }
  );

  const holidayWeekdayNumbers = holidaysWithinPeriod.map((holyday: any) =>
    getWeekdayNumber(sumHours(holyday, 3))
  );

  const workingDayHolidays = holidayWeekdayNumbers.filter(
    (weekday: any) => weekday !== SUNDAY && weekday !== SATURDAY
  ).length;

  const dateSkippingWeekendsAndHolidays = sumBusinessDays(
    dateSkippingWeekends,
    workingDayHolidays
  );

  const date = await verifyHoliday(dateSkippingWeekendsAndHolidays);

  const dateSubHours = subHours(date, 3);

  const formattedDate = formatDate(dateSubHours, "yyyy-MM-dd'T'HH:mm");

  return formattedDate;
};
