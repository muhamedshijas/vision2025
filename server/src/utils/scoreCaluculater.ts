export function calculateSleepDuration(bedTime: string, wakeUpTime: string): string {
    // Convert both bed time and wake up time to Date objects
    const bedTimeDate = new Date(bedTime);
    const wakeUpTimeDate = new Date(wakeUpTime);

    // If wake-up time is earlier than bed time, it means the wake-up time is on the next day
    if (wakeUpTimeDate < bedTimeDate) {
        wakeUpTimeDate.setDate(wakeUpTimeDate.getDate() + 1); // Add 1 day to the wake-up time
    }

    // Calculate the difference in milliseconds
    const sleepDurationMillis = wakeUpTimeDate.getTime() - bedTimeDate.getTime();

    // Convert milliseconds to hours and minutes
    const sleepDurationHours = Math.floor(sleepDurationMillis / (1000 * 60 * 60));
    const sleepDurationMinutes = Math.floor((sleepDurationMillis % (1000 * 60 * 60)) / (1000 * 60));

    return `${sleepDurationHours} hours ${sleepDurationMinutes} minutes`;
}

export async function calculateSleepScore(hours) {



    let score;

    if (hours >= 24) {
        // Extremely excessive sleep, severely penalized
        score = 5;  // You can change this to any lower value
    } else if (hours >= 12) {
        // Oversleeping, still a penalty but not as severe
        score = 10;
    } else if (hours >= 9) {
        // Over-sleeping slightly penalized
        score = 40;
    } else if (hours >= 7) {
        // Ideal sleep duration
        score = 90;
    } else if (hours >= 5) {
        // Slightly under-sleeping, but still functional
        score = 60;
    } else if (hours >= 3) {
        // Significant under-sleeping
        score = 30;
    } else {
        // Extremely under-sleeping
        score = 10;
    }

    console.log(score);

    return score
}

