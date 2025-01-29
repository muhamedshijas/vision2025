import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GiKeyboard } from "react-icons/gi";
import gitHub from "../../assets/icons/github.png";
import suitcase from "../../assets/icons/suitcase.png";
import keyboard from "../../assets/icons/keyboard.png";
import script from "../../assets/icons/script.png";
import { RiGithubFill, RiTerminalBoxFill } from "react-icons/ri";
import {
  getGitColor,
  getJobColor,
  getLeetCodeColor,
  getTypingColor,
} from "../../utilities/colorUtils";
function DailyRoutine() {
  const [skillScore, setSkillScore] = useState(false);
  const targetWPM = 75; // Set your target WPM
  const targetCommits = 6;
  const targetJobCount = 10;
  const targetProblems = 3;

  const jobs = 0;
  const problems = 3;
  const wpm = 72;
  const commits = 4;

  useEffect(() => {
    if (commits && jobs && problems && wpm) {
      setSkillScore(true);
    } else {
      setSkillScore(false);
    }
  }, [commits, jobs, problems, wpm]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-around",
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
        <Typography variant="h4">Daily Routine Tracker</Typography>
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
                {wpm ? wpm : "no data"}
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
                {problems ? problems : "no data"}
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
              <Typography variant="body2">
                {commits ? commits : "no data"}
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
                {jobs ? jobs : "no data"}
              </Typography>
            </Box>
          </Box>
        </Box>
        {skillScore ? (
          <Box>Score</Box>
        ) : (
          <Button variant="contained">Update Data</Button>
        )}
      </Box>

      {/* Skill Enhancement Section */}
      <Box
        width="700px"
        height="48%"
        borderRadius="5px"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
      >
        <Typography variant="h4">Skill Enhancement</Typography>
        <Box width="100%" display="flex" gap="20px" paddingLeft="20px">
          <Box
            width="150px"
            height="150px"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            borderRadius="5px"
          ></Box>
          <Box
            width="150px"
            height="150px"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            borderRadius="5px"
          ></Box>
          <Box
            width="150px"
            height="150px"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            borderRadius="5px"
          ></Box>
          <Box
            width="150px"
            height="150px"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            borderRadius="5px"
          ></Box>
        </Box>
        <Button variant="contained">Update Data</Button>
      </Box>
    </div>
  );
}

export default DailyRoutine;
