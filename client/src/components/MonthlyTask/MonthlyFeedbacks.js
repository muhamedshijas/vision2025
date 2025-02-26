import { Box, Typography, Pagination, Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MonthlyFeedbacks() {
  const user = useSelector((state) => state.user.detials);
  const userId = user._id;
  const refresh = useSelector((state) => state.refresh);
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "short" })
  );

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`monthly-task/get-feedbacks`, {
          params: { userId, month },
        });
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchFeedback();
  }, []);
  console.log(feedbacks);
  const cardsPerPage = 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(feedbacks.length / cardsPerPage);

  // Slice feedbacks based on pagination
  const displayedFeedbacks = feedbacks.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  const handleChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box width="100%" textAlign="center">
      <Typography variant="h3" mt={2} mb={3}>
        Feedbacks
      </Typography>
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
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
    </Box>
  );
}

export default MonthlyFeedbacks;
