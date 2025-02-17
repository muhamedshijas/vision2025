import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  FormControlLabel,
  Switch,
  Pagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

function MonthlyGoals() {
  const user = useSelector((state) => state.user.details);
  const userId = user?._id;

  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [visions, setVisions] = useState([
    { title: "Pray Thasbeeh", isCompleted: false },
    { title: "Complete 1 Qatm", isCompleted: false },
    { title: "Get at least 5 callbacks from companies", isCompleted: true },
    { title: "Read 2 Books", isCompleted: false },
    { title: "Exercise Daily", isCompleted: false },
    { title: "Save ₹5000", isCompleted: false },
    { title: "Complete React Course", isCompleted: false },
    { title: "Apply for 10 Jobs", isCompleted: true },
    { title: "Improve Coding Skills", isCompleted: false },
    { title: "Improve Coding Skills", isCompleted: false },
    { title: "Improve Coding Skills", isCompleted: false },
    { title: "Improve Coding Skills", isCompleted: false },
    { title: "Improve Coding Skills", isCompleted: false },
    { title: "Improve Coding Skills", isCompleted: false },
    { title: "Improve Coding Skills", isCompleted: false },
    { title: "Learn Redux", isCompleted: false },
  ]);

  const completedVisions = visions.filter((v) => v.isCompleted);
  const notCompletedVisions = visions.filter((v) => !v.isCompleted);

  const filteredVisions =
    tabIndex === 0 ? notCompletedVisions : completedVisions;

  // Adjusting the displayed visions to ensure "ADD NEW GOAL" always appears as the last item
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage - 1; // Reserve space for button
  const paginatedVisions = filteredVisions.slice(startIdx, endIdx);

  const totalPages = Math.ceil((filteredVisions.length + 1) / itemsPerPage);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    setCurrentPage(1);
  };

  const handleToggle = async (title, isCompleted) => {
    await axios.put("/profile/updatevision", { title, isCompleted, userId });
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} textAlign="center">
        MONTHLY GOALS
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleChange}
        centered
        sx={{ marginTop: "10px" }}
      >
        <Tab label="Not Completed" />
        <Tab label="Completed" />
      </Tabs>

      <Box mt={2} display="flex" flexWrap="wrap" justifyContent="space-between">
        {paginatedVisions.map((vision, index) => (
          <Box
            key={index}
            width="45%"
            height="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            borderRadius="10px"
            textAlign="center"
            padding="10px"
            marginBottom="10px"
          >
            <Typography>{vision.title}</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={vision.isCompleted}
                  onChange={() =>
                    handleToggle(vision.title, vision.isCompleted)
                  }
                />
              }
              label={vision.isCompleted ? "Completed" : "Mark as Completed"}
            />
          </Box>
        ))}
        {tabIndex === 0 &&  (
          <Box
            width="45%"
            height="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            borderRadius="10px"
            textAlign="center"
            padding="10px"
            marginBottom="10px"
            sx={{
              cursor: "pointer",
              fontWeight: 600,
              backgroundColor: "#f5f5f5",
            }}
          >
            ADD NEW GOAL
          </Box>
        )}

        {/* ADD NEW GOAL Button - Last Card */}
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
        />
      </Box>
    </Box>
  );
}

export default MonthlyGoals;
