import dayjs from "dayjs";

export interface DayInfo {
  dayText: string;
  timeText: string;
  isToday: boolean;
}

export const getDateInfo = (startDate: string, endDate: string): DayInfo => {
  const now = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const startTime = start.format("hh:mm a");
  const endTime = end.format("hh:mm a");

  const result: DayInfo = {
    dayText: "",
    timeText: "",
    isToday: false,
  };

  if (start.isSame(end, "day")) {
    if (start.isSame(now, "day")) {
      result.isToday = true;
      result.dayText = "Today";
    } else if (start.isSame(now, "week")) {
      result.dayText = start.format("ddd");
    } else {
      result.dayText = start.format("DD MMMM");
    }
    result.timeText = `${startTime} - ${endTime}`;
  } else {
    let startDay = start.format("DD MMMM");
    const endDay = end.format("DD MMMM");
    if (start.isSame(now, "day")) {
      startDay = "Today";
      result.isToday = true;
    }
    result.dayText = `${startDay} ${startTime} -`;
    result.timeText = `${endDay} ${endTime}`;
  }
  return result;
};
