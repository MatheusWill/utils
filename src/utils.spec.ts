import {
  getExpirationDateByDaysSkippingWeekendsAndHolidays,
  verifyCardFlag,
} from "./utils";

test("should return a date expiration", async () => {
  const result = await getExpirationDateByDaysSkippingWeekendsAndHolidays(4);
  expect(result).toEqual("2022-08-29");
});

test("should bin card", () => {
  const result = verifyCardFlag("4000000000000010");
  expect(result).toEqual("VISA");
});
