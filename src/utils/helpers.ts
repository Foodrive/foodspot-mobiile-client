import dayjs from "dayjs";
import { Food, Location } from "@app/utils/types";
import { UserInvitation } from "@app/graphql/queries";
import { InvitationStatus } from "@app/utils/constants";

export interface DayInfo {
  dayText: string;
  timeText: string;
  isToday: boolean;
}

/**
 * Retrieves the text form of the event's date information in a nicer format.
 * The result follows the following conditions:
 * - If the start date of the event is happening today, the day text will be "Today".
 * - If the end date and start date are on the same day, the day text will be a single day
 * - If the start date or end date is on the same week as today, the day text will be the day (e.g. Mon, Tue, etc..)
 * - If the start date and end date is on different days of the week, it will display their dates separately
 * @param startDate
 * @param endDate
 */
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

export const createFoodItem = (
  allergens: string[],
  servings: number,
  name?: string,
  description?: string,
): Food => ({
  name: name ?? "Event Food",
  description,
  servings,
  allergens,
});

export const createLocationFromAddress = (address: string): Location => ({
  address,
});

export const getAttendeeCount = (
  invitations: UserInvitation[],
  maxCapacity: number,
): { claimsLeft: number; pending: number } => {
  let numPending = 0;
  let numAttendees = 0;

  for (const invitation of invitations) {
    if (invitation.status === InvitationStatus.pending) {
      numPending++;
    }
    numAttendees += invitation.numAttendees;
  }

  return {
    claimsLeft: maxCapacity - numAttendees,
    pending: numPending,
  };
};
