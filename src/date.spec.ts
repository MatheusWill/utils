import { getExpirationDateByDaysSkippingWeekendsAndHolidays } from "./date";

test("should return a date expiration", async () => {
  const result = await getExpirationDateByDaysSkippingWeekendsAndHolidays(1);
  expect(result).toEqual("2022-08-30T12:26");
});
