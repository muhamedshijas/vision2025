import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function MonthlyScores() {
  const refresh = useSelector((state) => state.refresh);
  const user = useSelector((state) => state.user.detials);
  const userId = user?._id;
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "short" })
  );
  const [dates, setDates] = useState([]);
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`monthly-task/get-feedbacks`, {
          params: { userId, month },
        });
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedback();
  }, [userId, month, refresh]);

  // Function to extract day name and date number from date string
  const getDayAndDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number); // Extract day, month, year
    const dateObj = new Date(year, month - 1, day); // Create Date object
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" }); // Get full day name
    return { day: day, dayName }; // Return separate values
  };

  return (
    <Box p={3}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Scores Data
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {dates.map((item, index) => {
          const { day, dayName } = getDayAndDate(item.date);
          return (
            <Box
              key={index}
              width="200px"
              height="200px"
              bgcolor="red"
              borderRadius="10px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              color="white"
            >
              <Typography variant="h2" fontWeight="bold">
                {day}
              </Typography>
              <Typography variant="h5">{dayName}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default MonthlyScores;
