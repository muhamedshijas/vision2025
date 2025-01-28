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
