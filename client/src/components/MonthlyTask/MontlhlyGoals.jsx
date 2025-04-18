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
import { RiDeleteBinFill, RiAddLargeFill } from "react-icons/ri";
import { useSelector } from "react-redux";
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

  const [goals, setGoals] = useState([]);
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "short" })
  );
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("monthly-task/get-goals", {
          params: { userId, month },
        });
        if (response.data.length === 0) {
          setNoData(true);
        } else {
          setGoals(response.data);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    if (userId) {
      fetchGoals();
    }
  }, [userId, refresh, month]);
  console.log(goals);

  const completedGoals = goals.filter((v) => v.isCompleted);
  const notCompletedGoals = goals.filter((v) => !v.isCompleted);

  const filteredGoals = tabIndex === 0 ? notCompletedGoals : completedGoals;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedGoals = filteredGoals.slice(startIdx, startIdx + itemsPerPage);

  const totalPages = Math.ceil(filteredGoals.length / itemsPerPage);
  const isLastPage = currentPage === totalPages || totalPages === 0;

  const handleModal = () => setShow(!show);
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    setCurrentPage(1);
  };

  const handleDelete = async (goal) => {
    await axios.delete("/monthly-task/deletegoal", {
      params: { goal, userId, month },
    });
  };

  const handleToggle = async (goal, isCompleted) => {
    await axios.put("/monthly-task/updategoal", {
      goal,
      isCompleted,
      userId,
      month,
    });
  };

  const currentMonth = new Date().getMonth();
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
  const availableMonths = months.slice(0, currentMonth + 1);

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
        {`${completedGoals.length} out of ${goals.length} completed`}
      </Typography>

      <FormControl
        sx={{
          minWidth: 120,
          marginTop: "10px",
          display: "block",
          marginLeft: "25px",
        }}
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
        {paginatedGoals.length === 0 ? (
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
          paginatedGoals.map((goal, index) => (
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
              <Typography>{goal.title}</Typography>
              {currentMonth === months.indexOf(month) && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={goal.isCompleted}
                      onChange={() =>
                        handleToggle(goal.title, goal.isCompleted)
                      }
                    />
                  }
                  label={goal.isCompleted ? "Completed" : "Mark as Completed"}
                />
              )}
              {goal?.isCompleted&&<Typography color="success" fontWeight={600}> COMPLETED ON {goal?.completedDate}</Typography>}
              <RiDeleteBinFill
                color="red"
                fontSize="22px"
                onClick={() => handleDelete(goal.title)}
              />
            </Box>
          )) 
        )}

        {tabIndex === 0 &&
          (paginatedGoals.length === 0 || isLastPage) &&
          currentMonth === months.indexOf(month) && (
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
