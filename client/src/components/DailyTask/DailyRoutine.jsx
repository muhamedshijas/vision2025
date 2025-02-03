import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import gitHub from "../../assets/icons/github.png";
import suitcase from "../../assets/icons/suitcase.png";
import keyboard from "../../assets/icons/keyboard.png";
import script from "../../assets/icons/script.png";
import sleepTime from "../../assets/icons/sleepTime.png";
import meals from "../../assets/icons/meal.png";
import cup from "../../assets/icons/cup.png";
import upload from "../../assets/icons/upload.png";
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
import axios from "axios";
function DailyRoutine() {
  const user = useSelector((state) => state.user.detials);
  const refresh = useSelector((state) => state.refresh);

  const userId = user._id;
  const [routines, setRoutines] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showRoutineModal, setShowRoutineModal] = useState(false);

  const [skillScore, setSkillScore] = useState(1);
  const [routineScore, setRoutineScore] = useState();

  useEffect(() => {
    const fetchDailyRouine = async () => {
      try {
        const { data } = await axios.get(
          `daily-task/get-daily-routine/${userId}`
        );
        setRoutines(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (userId) {
      fetchDailyRouine();
    }
  }, [userId, refresh]);
  console.log(routines);

  const targetWPM = 75; // Set your target WPM
  const targetCommits = 6;
  const targetJobCount = 10;

  const targetProblems = 3;
  const targetSleepHour = 7;

  const jobs = routines?.applications ? routines.applications : 0;
  const problems = routines?.problems ? routines.problems : 0;
  const wpm = routines?.avgWpm ? routines.avgWpm : 0;
  const commits = routines?.gitCommit ? routines.gitCommit : 0;

  const sleepHour = routines?.sleepHr ? routines.sleepHr : 0;
  const foodScore = routines?.foodScore ? routines.foodScore : 0;
  const sleepScore = routines?.sleepScore ? routines.sleepScore : 0;
  const avgSleepScore = routines?.normalizedSleepScore
    ? routines.normalizedSleepScore
    : 0;
  const avgFoodScore = routines?.normalizedFoodScore
    ? routines.normalizedFoodScore
    : 0;
  const avgWpm = routines?.normalizedWpm;
  const avgCommits = routines?.normalizedCommits;
  const avgJobs = routines?.normalizedJobs;
  const avgProblems = routines?.normalizedProblems;
  useEffect(() => {
    if (foodScore && sleepHour) {
      setRoutineScore(routines?.avgHelathScore);
      console.log(routineScore);
    } else {
      setRoutineScore(0);
    }
  }, [foodScore, sleepHour]);

  useEffect(() => {
    if (routines?.avgSkillScore) {
      setSkillScore(routines?.avgSkillScore);
      console.log(skillScore);
    } else {
      setSkillScore(0);
    }
  }, [commits, jobs, problems, wpm]);

  const totalScore = routineScore + skillScore;
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
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h4">Daily Skills Tracker</Typography>
          <Box
            onClick={handleSkillModal}
            sx={{
              borderRadius: "3px",
              width: "80px",
              marginLeft: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            <img src={upload} height="30px" width="30px" />
            UPLOAD
          </Box>
        </Box>
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
                {wpm ? `${wpm} WPM` : 0}
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
                {problems ? `${problems} solved` : 0}
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
                {commits ? `${commits} commits` : 0}
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
                {jobs ? `${jobs} Applcations` : 0}
              </Typography>
            </Box>
          </Box>
        </Box>
        {skillScore ? (
          <Box>
            <Typography
              variant="h6"
              fontWeight={600}
            >{`Total Score = ${skillScore}`}</Typography>
          </Box>
        ) : (
          ""
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
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4">Daily Skills Tracker</Typography>
            <Box
              onClick={handleRoutineModal}
              sx={{
                borderRadius: "3px",
                width: "80px",
                marginLeft: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <img src={upload} height="30px" width="30px" />
              UPLOAD
            </Box>
          </Box>
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
                  {sleepHour ? `${sleepHour} hrs` : 0}
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
                  {foodScore ? `${foodScore} points` : 0}
                </Typography>
              </Box>
            </Box>
          </Box>
          {routineScore ? (
            <Typography variant="h6" fontWeight={600}>
              {` Total Score = ${routineScore}`}
            </Typography>
          ) : (
            ""
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
                    {totalScore ? totalScore : "000"}
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
            <Typography> 0</Typography>
          )}
        </Box>

        {showSkillModal && (
          <AddDailyScore
            showSkillModal={showSkillModal}
            setShowSkillModal={setShowSkillModal}
            userId={userId}
          />
        )}

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
