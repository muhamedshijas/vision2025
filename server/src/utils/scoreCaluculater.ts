export function calculateSleepDuration(bedTime: string, wakeUpTime: string): string {
    // Convert both bed time and wake up time to Date objects
    const bedTimeDate = new Date(bedTime);
    const wakeUpTimeDate = new Date(wakeUpTime);

    // If wake-up time is earlier than bed time, adjust to next day
    if (wakeUpTimeDate < bedTimeDate) {
        wakeUpTimeDate.setDate(wakeUpTimeDate.getDate() + 1);
    }

    // Calculate sleep duration in milliseconds
    const sleepDurationMillis = wakeUpTimeDate.getTime() - bedTimeDate.getTime();

    // Convert to total hours (as a float)
    const sleepDurationHours = sleepDurationMillis / (1000 * 60 * 60);

    return `${sleepDurationHours} hours`;
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
    return score
}

export function calculateFoodScore(foods: string[]): number {
    const scoringMap: { [key: string]: number } = {
        breakfast: 20,
        lunch: 20,
        dinner: 20,
        midMorningSnack: 10,
        eveningSnack: 10,
        hotelFood: -15,
    };

    let foodScore = foods.reduce((total, food) => total + (scoringMap[food] || 0), 0);

    // If too many meals/snacks are selected (more than 4), reduce score (unhealthy)
    if (foods.length > 4) {
        foodScore -= 10; // Reduce score for overconsumption
    }

    // If both breakfast and dinner are missing, consider it unhealthy (reduce score)
    if (!foods.includes("breakfast") && !foods.includes("dinner")) {
        foodScore -= 15; // Missing key meals
    }

    // Ensure score remains within 0-100 range
    return Math.max(0, Math.min(foodScore, 100));
}


// utils/calculateAverage.ts
export function calculateTypingAverage(typingScore: Record<string, number>): number {
    const scores = Object.values(typingScore); // Extract numeric values
    if (scores.length === 0) return 0; // Avoid division by zero
    const total = scores.reduce((sum, score) => sum + score, 0); // Sum up all scores
    return Math.floor(total / scores.length) // Calc ulate average
}
const normalizeScore = (score, maxScore =  100) => {
    return (score / maxScore) * 25;  // Normalize to out of 50
};

// Function to calculate the average of foodScore and healthScore
export function calculateAverageHealthScore(foodScore, sleepScore) {
    // Normalize both scores
    const normalizedFoodScore = normalizeScore(foodScore);
    const normalizedSleepScore = normalizeScore(sleepScore);

    // Calculate the average of the normalized scores
    const averageScore = normalizedFoodScore + normalizedSleepScore ;

    // Return the average score
    return { normalizedFoodScore, normalizedSleepScore, averageScore };
}

export function calulateNormalizedWpm(wpm) {
    const targetWpm = 75;
    return Math.min(Math.floor((wpm / targetWpm) * 25), 25);
}

export function calculateNormalizedCommit(commits) {
    const targetCommits = 5;
    return Math.min(Math.floor((commits / targetCommits) * 25), 25);
}

export function calculateNormalizedProblems(problems) {
    const targetProblems = 3;
    return Math.min(Math.floor((problems / targetProblems) * 25), 25);
}
export function caluclalateNormalizedJobs(applications) {
    const targetApplications = 10;
    return Math.min(Math.floor((applications / targetApplications) * 25), 25);
}
export function calculateAvgSkillScore(wpm, commits, problems, applications) {
    wpm = wpm ?? 0;
    commits = commits ?? 0;
    problems = problems ?? 0;
    applications = applications ?? 0;

    // Sum of all skill scores (max possible is 100)
    const totalScore = wpm + commits + problems + applications;
    

    // Normalize the score to fit within 50
    const scaledScore = (totalScore / 100) * 50;

    return Math.floor(scaledScore);

}