import { Box, Typography, Grid, Select, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MonthlyScoreModal from "../../modals/MonthlyTask/MonthlyScoreModal";

function MonthlyScores() {
  const refresh = useSelector((state) => state.refresh);
  const user = useSelector((state) => state.user.detials);
  const userId = user?._id;

  const monthsArray = [
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

  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "short" })
  );
  const [dates, setDates] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(`monthly-task/get-scores`, {
          params: { userId, month },
        });
        setDates(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchScores();
  }, [userId, month, refresh]);

  const handleModal = (id) => {
    setSelectedId(id);
    setShow(!show);
  };

  // Generate full month structure
  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = monthsArray.indexOf(month); // Get correct month index

    const firstDay = new Date(year, monthIndex, 1).getDay(); // First day (0-6)
    const lastDate = new Date(year, monthIndex + 1, 0).getDate(); // Last day (28, 30, 31)

    const weeks = [];
    let currentWeek = new Array(7).fill(null);
    let dateIndex = 1;

    while (dateIndex <= lastDate) {
      for (let day = 0; day < 7; day++) {
        if (dateIndex === 1 && day < firstDay) {
          currentWeek[day] = null;
        } else if (dateIndex > lastDate) {
          currentWeek[day] = null;
        } else {
          const fullDate = new Date(year, monthIndex, dateIndex);
          const dateObj = dates.find(
            (item) => new Date(item.date).getDate() === dateIndex
          );
          currentWeek[day] = dateObj
            ? { ...dateObj, dayIndex: fullDate.getDay() }
            : { date: fullDate, disabled: true };
          dateIndex++;
        }
      }
      weeks.push(currentWeek);
      currentWeek = new Array(7).fill(null);
    }

    return weeks;
  };

  const weeks = generateCalendar();

  return (
    <Box p={3}>
      <Box display="flex" width="90%" justifyContent="space-around" mb={4}>
        <Typography variant="h5"  fontWeight={600} textAlign="center">
          Monthly Scores Calendar
        </Typography>
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ width: "30%", height: "40px", }}
        >
          {monthsArray.map((m, index) => (
            <MenuItem
              key={m}
              value={m}
              disabled={index > new Date().getMonth()}
            >
              {m}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Days Header */}
      <Grid container spacing={1} justifyContent="center" ml={1} sx={{ mb: 2 }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <Grid item key={idx} xs={12 / 7} textAlign="left">
            <Typography
              variant="h6"
              fontWeight="bold"
              color={day === "Sun" ? "red" : "black"}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar Body */}
      {weeks.map((week, weekIndex) => (
        <Grid container spacing={1} justifyContent="center" key={weekIndex}>
          {week.map((item, dayIndex) => (
            <Grid item key={dayIndex} xs={12 / 7} textAlign="center">
              <Box
                width="60px"
                height="60px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                borderRadius="3px"
                mb={2}
                sx={{
                  cursor: item?.disabled ? "not-allowed" : "pointer",
                  backgroundColor: item?.disabled ? "#f0f0f0" : "white",
                  boxShadow: item?.disabled
                    ? "none"
                    : "rgba(149, 157, 165, 0.2) 0px 4px 12px",
                  color: item?.dayIndex === 0 ? "red" : "black",
                  opacity: item?.disabled ? 0.5 : 1,
                }}
                onClick={() => !item?.disabled && handleModal(item._id)}
              >
                <Typography variant="h6" fontWeight="bold">
                  {item ? new Date(item.date).getDate() : ""}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ))}

      {show && (
        <MonthlyScoreModal
          show={show}
          setShow={setShow}
          selectedId={selectedId}
        />
      )}
    </Box>
  );
}

export default MonthlyScores;
