import {
  sumHours,
  sumBusinessDays,
  formatDate,
  getWeekdayNumber,
  verifyHoliday,
} from "./date";
import { Flags, binRegex } from "./constants";
import fs from "fs";
import { resolve } from "path";

const holidayJsonPath = resolve(__dirname, "holidays.json");
const holidayJson = fs.readFileSync(holidayJsonPath, "utf8");

/**
 * Returns a String value that indicates the next business day.
 * @param expirationIn Number of working days to skip.
 */
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

  const formattedDate = formatDate(date, "yyyy-MM-dd");

  return formattedDate;
};

/**
 * Returns a string value that indicates the card's flag.
 * @param bin String of bin or card.
 */
export const verifyCardFlag = (bin: string) => {
  for (const flag of binRegex) {
    if (flag.regex.test(bin)) {
      return flag.name;
    }
  }

  return Flags.OTHER;
};
