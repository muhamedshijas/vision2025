import { Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function AddDailySkillScore({ setShowSkillModal, showSkillModal, userId }) {
  const [test1, setTest1] = useState(0);
  const [test2, setTest2] = useState(0);
  const [test3, setTest3] = useState(0);
  const [leetCodeProblems, setLeetCodeProblems] = useState(0);
  const [gitCommits, setGitCommits] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const typingScore = { test1, test2, test3 };
    console.log(typingScore, gitCommits, leetCodeProblems);
    const response = await axios.post("daily-task/add-daily-skill-data", {
      gitCommits,
      leetCodeProblems,
      typingScore,
      userId,
    });
    if (!response.err) {
      setShowSkillModal(!showSkillModal);
    }
  };
  const handleClose = () => {
    setShowSkillModal(!showSkillModal);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0px"
      top="0px"
      bgcolor="rgba(5, 5, 5, 0.141)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius="6px"
        boxShadow="0 0 10px rgba(0,0,0,0.3)"
        width="400px"
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Add Skill Score
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography sx={{ fontWeight: 600 }}>Add typing score</Typography>
            <Box display="flex" justifyContent="space-between">
              <TextField
                label="Test 1"
                name="test1"
                style={{ width: "130px" }}
                value={test1}
                onChange={(e) => {
                  setTest1(e.target.value);
                }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                label="Test 2"
                name="test2"
                value={test2}
                onChange={(e) => {
                  setTest2(e.target.value);
                }}
                style={{ width: "130px" }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <TextField
                label="Test 3"
                name="test3"
                style={{ width: "130px" }}
                value={test3}
                onChange={(e) => {
                  setTest3(e.target.value);
                }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Box>

            <Typography sx={{ fontWeight: 600 }}>
              Add leet code problems
            </Typography>
            <TextField
              label="Total problems solved"
              value={leetCodeProblems}
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value))
                  setLeetCodeProblems(e.target.value);
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <Typography sx={{ fontWeight: 600 }}>
              Add total Git commits
            </Typography>
            <TextField
              label="Total git commits"
              value={gitCommits}
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value))
                  setGitCommits(e.target.value);
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <Box width="100%" display="flex" justifyContent="space-around">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "180px",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "180px",
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default AddDailySkillScore;
