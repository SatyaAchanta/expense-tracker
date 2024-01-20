import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(LocalizedFormat);
dayjs.tz.setDefault("America/New_York");

export const getDateInUserTimezone = (date: Date) => {
  const timezone = dayjs.tz.guess();
  const dateInUserTimezone = dayjs.tz(date.toLocaleString(), timezone);

  return dateInUserTimezone.format("L");
};
