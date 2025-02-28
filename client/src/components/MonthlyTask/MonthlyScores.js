import { Box, Typography, Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MonthlyScores() {
  const refresh = useSelector((state) => state.refresh);
  const user = useSelector((state) => state.user.detials);
  const userId = user?._id;

  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "short" })
  );
  const [dates, setDates] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15; // ✅ Show 15 cards per page

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

  // ✅ Function to Extract Day Name and Date Number
  const getDayAndDate = (dateString) => {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return { day: "Invalid", dayName: "Invalid" };

    const day = dateObj.getDate();
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    return { day, dayName };
  };

  // ✅ Paginate Data
  const totalPages = Math.ceil(dates.length / itemsPerPage);
  const paginatedDates = dates.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box p={3}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Scores Data
      </Typography>

      {/* ✅ Cards Grid */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {paginatedDates.map((item, index) => {
          const { day, dayName } = getDayAndDate(item.date);

          return (
            <Box
              key={index}
              width="150px"
              height="150px"
              boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
              borderRadius="10px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="h2" fontWeight="bold">
                {day}
              </Typography>
              <Typography variant="h5">{dayName}</Typography>
            </Box>
          );
        })}
      </Box>

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

export default MonthlyScores;
