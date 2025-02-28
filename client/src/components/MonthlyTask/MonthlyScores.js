import { Box, Typography, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MonthlyScoreModal from "../../modals/MonthlyTask/MonthlyScoreModal";

function MonthlyScores() {
  const refresh = useSelector((state) => state.refresh);
  const user = useSelector((state) => state.user.detials);
  const userId = user?._id;

  const [month, setMonth] = useState(new Date().toLocaleString("en-US", { month: "short" }));
  const [dates, setDates] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState();

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

  // Function to get day name and date
  const getDayAndDate = (dateString) => {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return { day: "Invalid", dayName: "Invalid", dayIndex: -1 };

    const day = dateObj.getDate();
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const dayIndex = dateObj.getDay(); // 0 = Sunday, 6 = Saturday

    return { day, dayName, dayIndex };
  };

  const handleModal = (id) => {
    setSelectedId(id);
    setShow(!show);
  };

  // Generate full month structure
  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const firstDay = new Date(year, monthIndex, 1).getDay(); // First day of the month (0-6)
    const lastDate = new Date(year, monthIndex + 1, 0).getDate(); // Last date of the month
    const weeks = [];

    let currentWeek = new Array(7).fill(null); // Fill week with null initially
    let dateIndex = 1;

    // Loop through the whole month and structure weeks
    while (dateIndex <= lastDate) {
      for (let day = 0; day < 7; day++) {
        if (dateIndex === 1 && day < firstDay) {
          currentWeek[day] = null; // Empty slots before the 1st of the month
        } else if (dateIndex > lastDate) {
          currentWeek[day] = null; // Empty slots after last date
        } else {
          const fullDate = new Date(year, monthIndex, dateIndex);
          const dateObj = dates.find((item) => new Date(item.date).getDate() === dateIndex);
          currentWeek[day] = dateObj ? { ...dateObj, dayIndex: fullDate.getDay() } : { date: fullDate, disabled: true };
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
      <Typography variant="h5" textAlign="center" mb={2}>
        Monthly Scores Calendar
      </Typography>

      {/* Days Header */}
      <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <Grid item key={idx} xs={1.5}>
            <Typography variant="h6" textAlign="center" color={day === "Sun" ? "red" : "black"}>
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar Body */}
      {weeks.map((week, weekIndex) => (
        <Grid container spacing={1} justifyContent="center" key={weekIndex}>
          {week.map((item, dayIndex) => (
            <Grid item key={dayIndex} xs={1.5}>
              <Box
                width="80px"
                height="80px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                borderRadius="10px"
                mb={2}
                sx={{
                  cursor: item?.disabled ? "not-allowed" : "pointer",
                  backgroundColor: item?.disabled ? "#f0f0f0" : "white",
                  boxShadow: item?.disabled ? "none" : "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  color: item?.dayIndex === 0 ? "red" : "black", // Sundays in Red
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
        <MonthlyScoreModal show={show} setShow={setShow} selectedId={selectedId} />
      )}
    </Box>
  );
}

export default MonthlyScores;
