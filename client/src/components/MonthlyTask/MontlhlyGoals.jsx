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
import { RiAddLargeFill } from "react-icons/ri";
import axios from "axios";
import AddMonthlyGoalsModals from "../../modals/MonthlyTask/AddMonthlyGoalModals";

function MonthlyGoals() {
  const user = useSelector((state) => state.user.details);
  const userId = user?._id;

  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
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
  ]);

  const completedVisions = visions.filter((v) => v.isCompleted);
  const notCompletedVisions = visions.filter((v) => !v.isCompleted);

  const filteredVisions =
    tabIndex === 0 ? notCompletedVisions : completedVisions;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedVisions = filteredVisions.slice(startIdx, endIdx);

  const totalPages = Math.ceil(filteredVisions.length / itemsPerPage);
  const isLastPage = currentPage === totalPages;
  const handleModal = () => {
    setShow(!show);
  };
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    setCurrentPage(1);
  };

  let completed = 0;
  let notCompleted = 0;

  for (let i = 0; i < visions.length; i++) {
    // Fix: Change `i <= visions.length` to `i < visions.length`
    if (visions[i].isCompleted) {
      // Fix: Check `visions[i].isCompleted`
      completed++;
    } else {
      notCompleted++;
    }
  }

  const handleToggle = async (title, isCompleted) => {
    await axios.put("/profile/updatevision", { title, isCompleted, userId });
  };

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        centered
        sx={{ marginTop: "10px" }}
      >
        <Tab label="Not Completed" />
        <Tab label="Completed" />
      </Tabs>
      <Typography textAlign="center" marginTop="20px">
        {" "}
        {`${completed} out ${visions.length}`} completed
      </Typography>
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

        {/* Show the ADD NEW GOAL button only on the last page of Not Completed Goals */}
        {tabIndex === 0 && isLastPage && (
          <Box
            width="45%"
            height="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="20px"
            color="#0000EE"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            borderRadius="10px"
            textAlign="center"
            padding="10px"
            marginBottom="10px"
            sx={{
              cursor: "pointer",
              fontWeight: 600,
              backgroundColor: "white",
            }}
            onClick={handleModal}
          >
            <RiAddLargeFill fontSize="22px" />
            ADD NEW GOAL
          </Box>
        )}
      </Box>
      {show && (
        <AddMonthlyGoalsModals show={show} setShow={setShow} userId={userId} />
      )}
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
