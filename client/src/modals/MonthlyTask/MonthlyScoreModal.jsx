import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

function MonthlyScoreModal({ show, setShow, selectedId }) {
  const [scores, setScores] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [report, setReport] = useState({});
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/monthly-task/get-scoresbyid/${selectedId}`
        );
        setScores(data.routineData || {});
        setReport(data.reports || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedId) {
      fetchData();
    }
  }, [selectedId]);

  // Function to check if scrolling is possible
  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = contentRef.current;
        setShowScrollIndicator(
          scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight
        );
      }
    };

    checkScroll();
    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", checkScroll);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const handleClose = () => setShow(!show);

  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0"
      top="0"
      bgcolor="rgba(5, 5, 5, 0.141)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={1300}
    >
      <Box
        bgcolor="white"
        p={2}
        borderRadius="6px"
        boxShadow="0 0 10px rgba(0,0,0,0.3)"
        width="500px"
        maxHeight="80vh"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        {/* Title */}
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          {`Details of ${selectedId}`}
        </Typography>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          centered
          sx={{ position: "sticky", top: 0, bgcolor: "white", zIndex: 1 }}
        >
          <Tab label="Scores" />
          <Tab label="Report" />
        </Tabs>

        {/* Scrollable Content */}
        <Box
          ref={contentRef}
          sx={{
            flex: 1,
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {tabIndex === 0 ? (
            <Box p={2}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Typing Score
                    </TableCell>
                    <TableCell>{`${
                      scores?.normalizedWpm || 0
                    } / 25`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Git Score</TableCell>
                    <TableCell>{`${
                      scores?.normalizedCommits || 0
                    } / 25`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Job Application Score
                    </TableCell>
                    <TableCell>{`${
                      scores?.normalizedJobs || 0
                    } / 25`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Leet Code Problem Score
                    </TableCell>
                    <TableCell>{`${
                      scores?.normalizedProblems || 0
                    } / 25`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                      Total Skills Score
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      {scores?.avgSkillScore || 0} / 50
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                      Total Health Score
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                      {scores?.avgHelathScore || 0} / 50
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "red",
                      }}
                    >
                      Total Score
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {(scores?.avgHelathScore || 0) +
                        (scores?.avgSkillScore || 0)}{" "}
                      / 100
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          ) : (
            <Box p={2}>
              <Table>
                <TableBody>
                  {/* Daily Routine Skills */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Typing Score
                    </TableCell>
                    <TableCell>
                      {`Test1: ${
                        report?.dailyRoutineSkills?.typingScore?.test1 || 0
                      }, `}
                      {`Test2: ${
                        report?.dailyRoutineSkills?.typingScore?.test2 || 0
                      }, `}
                      {`Test3: ${
                        report?.dailyRoutineSkills?.typingScore?.test3 || 0
                      }`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Commits</TableCell>
                    <TableCell>
                      {report?.dailyRoutineSkills?.commits || 0}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Problems Solved
                    </TableCell>
                    <TableCell>
                      {report?.dailyRoutineSkills?.problems || 0}
                    </TableCell>
                  </TableRow>

                  {/* Daily Routine Health */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Sleep Hours
                    </TableCell>
                    <TableCell>
                      {report?.daily_RoutineHealth?.sleepHour || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Foods Eaten
                    </TableCell>
                    <TableCell>
                      {(report?.daily_RoutineHealth?.foods || []).join(", ")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          )}
        </Box>

        {/* Scroll Arrow */}
        {showScrollIndicator && (
          <IconButton
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              bgcolor: "white",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "white" },
            }}
            onClick={() =>
              contentRef.current?.scrollBy({ top: 100, behavior: "smooth" })
            }
          >
            <KeyboardArrowDown />
          </IconButton>
        )}

        {/* Close Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleClose}
          sx={{
            bgcolor: "black",
            color: "white",
            position: "sticky",
            bottom: 0,
            zIndex: 1,
            mt: 2,
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default MonthlyScoreModal;
