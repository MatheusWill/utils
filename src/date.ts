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

export const formatDate = (date: Date, design: string) => {
  return format(date, design);
};

export const sumBusinessDays = (date: Date, num: number) => {
  return addBusinessDays(date, num);
};

export const sumHours = (date: Date, hours: number) => {
  return addHours(date, hours);
};

export const subHours = (date: Date, hours: number) => {
  return subHoursFunc(date, hours);
};

export const getWeekdayNumber = (date: Date) => {
  return date.getDay();
};

export const verifyHoliday = async (date: Date): Promise<Date> => {
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
