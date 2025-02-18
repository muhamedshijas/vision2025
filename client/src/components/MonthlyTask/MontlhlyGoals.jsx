import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  FormControlLabel,
  Switch,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RiAddLargeFill } from "react-icons/ri";
import axios from "axios";
import AddMonthlyGoalsModals from "../../modals/MonthlyTask/AddMonthlyGoalModals";

function MonthlyGoals() {
  const user = useSelector((state) => state.user.detials);
  const userId = user?._id;

  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const refresh = useSelector((state) => state.refresh);
  const itemsPerPage = 6;

  const [visions, setVisions] = useState([]);
  const [month, setMonth] = useState("Feb");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`monthly-task/get-goals`, {
          params: { userId, month },
        });
        setVisions(response.data);
        setNoData(response.data.length === 0);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (userId) {
      fetchJobs();
    }
  }, [userId, refresh, month]);

  const completedVisions = visions.filter((v) => v.isCompleted);
  const notCompletedVisions = visions.filter((v) => !v.isCompleted);

  const filteredVisions =
    tabIndex === 0 ? notCompletedVisions : completedVisions;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedVisions = filteredVisions.slice(startIdx, endIdx);

  const totalPages = Math.ceil(filteredVisions.length / itemsPerPage);
  const isLastPage = currentPage === totalPages || totalPages === 0;

  const handleModal = () => {
    setShow(!show);
  };

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    setCurrentPage(1);
  };

  let completed = completedVisions.length;
  let notCompleted = notCompletedVisions.length;

  const handleToggle = async (title, isCompleted) => {
    await axios.put("/profile/updatevision", { title, isCompleted, userId });
  };

  // Get the current month (0-11, where 0 is January, 1 is February, etc.)
  const currentMonth = new Date().getMonth(); // This will give you the current month (0-11)

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Filter months to disable the future months
  const availableMonths = months.slice(0, currentMonth + 1); // Take months from 0 to current month

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
        {`${completed} out of ${visions.length} completed`}
      </Typography>

      {/* Month Selection Dropdown */}
      <FormControl
        sx={{ minWidth: 120, marginTop: "10px", display: "block", marginLeft:"25px" }}
      >
        <InputLabel>Month</InputLabel>
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          label="Month"
          sx={{ width: "200px" }}
        >
          {months.map((m) => (
            <MenuItem key={m} value={m} disabled={!availableMonths.includes(m)}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2} display="flex" flexWrap="wrap" justifyContent="center">
        {paginatedVisions.length === 0 ? (
          <Box
            width="100%"
            textAlign="center"
            padding="20px"
            color="gray"
            fontSize="18px"
            fontWeight="bold"
          >
            No Data Available
          </Box>
        ) : (
          paginatedVisions.map((vision, index) => (
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
          ))
        )}

        {/* Show ADD NEW GOAL button when there is no data or it's the last page */}
        {tabIndex === 0 &&
          (paginatedVisions.length === 0 || (tabIndex === 0 && isLastPage)) && (
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
