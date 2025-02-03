import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const calculateSleepDuration = (bedTime, wakeUpTime) => {
  const format = "hh:mm A";

  // Convert to dayjs objects
  let bedTimeMoment = dayjs(bedTime, format);
  let wakeUpTimeMoment = dayjs(wakeUpTime, format);

  // If wake-up time is earlier in the day than bedtime, add 1 day to wake-up time
  if (wakeUpTimeMoment.isBefore(bedTimeMoment)) {
    wakeUpTimeMoment = wakeUpTimeMoment.add(1, "day");
  }

  // Calculate duration
  const sleepDuration = dayjs.duration(wakeUpTimeMoment.diff(bedTimeMoment));

  // Convert to hours and minutes
  const hours = Math.floor(sleepDuration.asHours());
  const minutes = sleepDuration.minutes();

  return `${hours} hours ${minutes} minutes`;
};

// Example usage:
const bedTime = "11:05 PM";
const wakeUpTime = "05:00 AM"; // Output: "5 hours 55 minutes"
