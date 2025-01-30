// utils/colorUtils.js
export const getJobColor = (jobs, targetJobCount) => {
  if (jobs >= targetJobCount) return "success";
  if (jobs >= targetJobCount / 2) return "info";
  return "error";
};

export const getGitColor = (commits, targetCommits) => {
  if (commits >= targetCommits) return "success";
  if (commits >= targetCommits / 2) return "info";
  return "error";
};

export const getTypingColor = (wpm, targetWPM) => {
  const percentage = (wpm / targetWPM) * 100;
  if (percentage >= 90) return "success"; // Green for 90% or above
  if (percentage >= 75) return "info"; // Blue for 75% to 89%
  return "error"; // Red for below 75%
};

export const getLeetCodeColor = (problems, targetProblems) => {
  if (problems >= targetProblems) return "success";
  if (problems >= targetProblems / 2) return "info";
  return "error";
};

export const getSleepHr = (hours) => {
  if (hours >= 7 && hours <= 9) return "success"; // Optimal sleep
  if ((hours >= 5 && hours < 7) || (hours > 9 && hours <= 11)) return "info"; // Slightly off
  return "error"; // Too little or too much sleep
};

export const getFoodClr=(score)=>{
  if(score >=80 && score<=100) return "success"
  if(score >=50 && score<=80) return "info"
  return "error"
}
export const getTotalClr=(score)=>{
  if(score >=80 && score<=100) return "success"
  if(score >=50 && score<=80) return "info"
  return "error"
}
export const getTotalColor=(score)=>{
  if(score >=80 && score<=100) return "green"
  if(score >=50 && score<=80) return "blue"
  return "red"
}
