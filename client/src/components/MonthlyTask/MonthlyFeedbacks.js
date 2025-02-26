import {
  Box,
  Typography,
  Pagination,
  Rating,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MonthlyFeedbacks() {
  const user = useSelector((state) => state.user.detials);
  const userId = user?._id;
  const refresh = useSelector((state) => state.refresh);
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "short" })
  );

  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const cardsPerPage = 8;

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

  // Filter out feedbacks without daily_Quote
  const filteredFeedbacks = feedbacks.filter((item) => item.daily_Quote);
  const totalPages = Math.ceil(filteredFeedbacks.length / cardsPerPage);
  const displayedFeedbacks = filteredFeedbacks.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  const handleChange = (_, value) => {
    setPage(value);
  };
  const currentMonthIndex = new Date().getMonth();
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

  // Limit selection to past & current months
  const availableMonths = months.slice(0, currentMonthIndex + 1);
  const filteredMonthFeedbacks = filteredFeedbacks.filter((job) => {
    const jobMonth = new Date(job.date).getMonth();
    return months[jobMonth] === month;
  });

  return (
    <Box width="100%">
      <Box width="100%" display="flex"  justifyContent="space-around" >
        <Typography fontSize="32px" color="blue" sx={{ fontWeight: 600 }} mt={2} mb={3}>
         Daily Feedbacks
        </Typography>
        <Select
          fullWidth
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          displayEmpty
          sx={{ width: "30%", height: "50px" }}
        >
          <MenuItem value="" disabled>
            Select a Month
          </MenuItem>
          {months.map((m, index) => (
            <MenuItem key={m} value={m} disabled={index > currentMonthIndex}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        gap="10px"
      >
        {displayedFeedbacks.map((item, index) => (
          <Box
            key={index}
            width="calc(45% - 5px)" // Two cards per row
            height="80px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            borderRadius="5px"
            p={2}
          >
            <Typography
              sx={{ fontWeight: "600", fontSize: "18px", textAlign: "center" }}
            >
              {item.daily_Quote?.phrase}
            </Typography>
            <Rating
              name="read-only-rating"
              value={item.daily_Quote?.rating} // The value of the rating
              readOnly
              precision={0.5} // Allows half-star ratings (optional)
            />
            <Typography variant="body2">Date: {item.date}</Typography>
          </Box>
        ))}
      </Box>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Box>
      )}
    </Box>
  );
}

export default MonthlyFeedbacks;
