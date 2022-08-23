import { getExpirationDateByDaysSkippingWeekendsAndHolidays } from "./utils";

test("should return a date expiration", async () => {
  const result = await getExpirationDateByDaysSkippingWeekendsAndHolidays(4);
  expect(result).toEqual("2022-04-22");
});
