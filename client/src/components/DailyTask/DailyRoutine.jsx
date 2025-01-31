import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import gitHub from "../../assets/icons/github.png";
import suitcase from "../../assets/icons/suitcase.png";
import keyboard from "../../assets/icons/keyboard.png";
import script from "../../assets/icons/script.png";
import sleepTime from "../../assets/icons/sleepTime.png";
import meals from "../../assets/icons/meal.png";
import cup from "../../assets/icons/cup.png";
import {
  getFoodClr,
  getGitColor,
  getJobColor,
  getLeetCodeColor,
  getSleepHr,
  getTotalClr,
  getTotalColor,
  getTypingColor,
} from "../../utilities/colorUtils";
import AddDailyScore from "../../modals/DailyTask/AddDailySkillScore";
import AddDailyRoutineScore from "../../modals/DailyTask/AddDailyRoutineScore";
import { useSelector } from "react-redux";
function DailyRoutine() {
  const user = useSelector((state) => state.user.detials);
  const userId = user._id;
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showRoutineModal, setShowRoutineModal] = useState(false);

  const [skillScore, setSkillScore] = useState(false);
  const [routineScore, setRoutineScore] = useState(false);
  const targetWPM = 75; // Set your target WPM
  const targetCommits = 6;
  const targetJobCount = 10;

  const targetProblems = 3;
  const targetSleepHour = 7;

  const jobs = 4;
  const problems = 3;
  const wpm = 72;
  const commits = 4;

  const sleepHour = 0;
  const foodScore = 90;

  const totalScore = 65;

  useEffect(() => {
    if (foodScore && sleepHour) {
      setRoutineScore(true);
    } else {
      setRoutineScore(false);
    }
  }, [foodScore, sleepHour]);

  useEffect(() => {
    if (commits && jobs && problems && wpm) {
      setSkillScore(true);
    } else {
      setSkillScore(false);
    }
  }, [commits, jobs, problems, wpm]);

  const handleSkillModal = () => {
    setShowSkillModal(!showSkillModal);
  };
  const handleRoutineModal = () => {
    setShowRoutineModal(!showSkillModal);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <Box
        width="100%"
        height="48%"
        borderRadius="5px"
        pb={2}
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      >
        <Typography variant="h4">Daily Skills Tracker</Typography>
        <Box
          width="100%"
          display="flex"
          gap="20px"
          paddingLeft="20px"
          justifyContent="space-around"
        >
          {/* Typing Box */}
          <Box
            width="170px"
            height="170px"
            borderRadius="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {/* Progress Bar */}
            <CircularProgress
              variant="determinate"
              value={wpm ? (wpm / targetWPM) * 100 : 1} // Calculate percentage
              size={150}
              thickness={2}
              style={{ position: "absolute" }}
              color={getTypingColor(wpm, targetWPM)} // Dynamically set color
            />
            {/* Content inside progress bar */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Typography>Typing</Typography>
              <img src={keyboard} width="60px" height="60px" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {wpm ? `${wpm} WPM` : "no data"}
              </Typography>
            </Box>
          </Box>
          <Box
            width="170px"
            height="170px"
            borderRadius="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {/* Progress Bar */}
            <CircularProgress
              variant="determinate"
              value={problems ? (problems / targetProblems) * 100 : 1} // Calculate percentage
              size={150}
              thickness={2}
              style={{ position: "absolute" }}
              color={getLeetCodeColor(problems, targetProblems)} // Dynamically set color
            />
            {/* Content inside progress bar */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Typography>Leetcode</Typography>
              <img src={script} width="60px" height="60px" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {problems ? `${problems} solved` : "no data"}
              </Typography>
            </Box>
          </Box>
          <Box
            width="170px"
            height="170px"
            borderRadius="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {/* Progress Bar */}
            <CircularProgress
              variant="determinate"
              value={commits ? (commits / targetCommits) * 100 : 1} // Calculate percentage
              size={150}
              thickness={2}
              style={{ position: "absolute" }}
              color={getGitColor(commits, targetCommits)} // Dynamically set color
            />
            {/* Content inside progress bar */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Typography>Git Commits</Typography>
              <img src={gitHub} width="60px" height="60px" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {commits ? `${commits} commits` : "no data"}
              </Typography>
            </Box>
          </Box>
          <Box
            width="170px"
            height="170px"
            borderRadius="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {/* Progress Bar */}
            <CircularProgress
              variant="determinate"
              value={jobs ? (jobs / targetJobCount) * 100 : 1} // Calculate percentage
              size={150}
              thickness={2}
              style={{ position: "absolute" }}
              color={getJobColor(jobs, targetJobCount)} // Dynamically set color
            />
            {/* Content inside progress bar */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Typography>Jobs</Typography>
              <img src={suitcase} width="60px" height="60px" />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {jobs ? `${jobs} Applcations` : "no data"}
              </Typography>
            </Box>
          </Box>
        </Box>
        {skillScore ? (
          <Box>Score</Box>
        ) : (
          <Button variant="contained" onClick={handleSkillModal}>
            Update Data
          </Button>
        )}
      </Box>

      {/* Skill Enhancement Section */}
      <Box
        width="100%"
        height="47%"
        borderRadius="5px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          width="65%"
          display="flex"
          gap="20px"
          padding="10px"
          height="100%"
          flexDirection="column"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Typography variant="h4">Health Score</Typography>
          <Box
            width="100%"
            height="100%"
            borderRadius="5px"
            display="flex"
            justifyContent="space-around"
          >
            <Box
              width="170px"
              height="170px"
              borderRadius="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              {/* Progress Bar */}
              <CircularProgress
                variant="determinate"
                value={sleepHour ? (sleepHour / targetSleepHour) * 100 : 1} // Calculate percentage
                size={150}
                thickness={2}
                style={{ position: "absolute" }}
                color={getSleepHr(sleepHour)} // Dynamically set color
              />
              {/* Content inside progress bar */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                <Typography>Sleep Time</Typography>
                <img src={sleepTime} width="60px" height="60px" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {sleepHour ? `${sleepHour} hrs` : "no data"}
                </Typography>
              </Box>
            </Box>

            <Box
              width="170px"
              height="170px"
              borderRadius="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              {/* Progress Bar */}
              <CircularProgress
                variant="determinate"
                value={foodScore ? foodScore : 1} // Calculate percentage
                size={150}
                thickness={2}
                style={{ position: "absolute" }}
                color={getFoodClr(foodScore)} // Dynamically set color
              />
              {/* Content inside progress bar */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                <Typography>Fooding</Typography>
                <img src={meals} width="60px" height="60px" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {foodScore ? `${foodScore} points` : "no data"}
                </Typography>
              </Box>
            </Box>
          </Box>
          {routineScore ? (
            <Typography>score :</Typography>
          ) : (
            <Button
              variant="contained"
              sx={{ width: "150px" }}
              onClick={handleRoutineModal}
            >
              Update Data
            </Button>
          )}
        </Box>
        <Box
          height="100%"
          width="31%"
          padding="10px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          borderRadius="5px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="10px"
          alignItems="center"
        >
          <Typography variant="h4">Total Score</Typography>
          {routineScore && skillScore ? (
            <>
              <Box
                width="170px"
                height="170px"
                borderRadius="5px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                {/* Progress Bar */}
                <CircularProgress
                  variant="determinate"
                  value={totalScore ? totalScore : 1} // Calculate percentage
                  size={150}
                  thickness={2}
                  style={{ position: "absolute" }}
                  color={getTotalClr(totalScore)} // Dynamically set color
                />
                {/* Content inside progress bar */}
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  position="relative"
                >
                  <Typography>Total Scroe</Typography>
                  <img src={cup} width="60px" height="60px" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {totalScore ? totalScore : "no data"}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "24px",
                  color: getTotalColor(totalScore),
                }}
              >
                {`Total Score: ${totalScore}/100`}
              </Typography>
            </>
          ) : (
            <Typography>no data</Typography>
          )}
        </Box>

        {showSkillModal && <AddDailyScore />}

        {showRoutineModal && (
          <AddDailyRoutineScore
            showRoutineModal={showRoutineModal}
            setShowRoutineModal={setShowRoutineModal}
            userId={userId}
          />
        )}
      </Box>
    </div>
  );
}

export default DailyRoutine;
