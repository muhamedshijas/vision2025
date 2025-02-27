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
import { RiEyeLine } from "react-icons/ri";
import MonthlyFeedbackModal from "../../modals/MonthlyTask/MonthlyFeedbackModal";

function MonthlyFeedbacks() {
  const user = useSelector((state) => state.user.detials);
  const userId = user?._id;
  const refresh = useSelector((state) => state.refresh);
  const [show, setShow] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "short" })
  );
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(""); // Sorting order

  const cardsPerPage = 6;

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

  const filteredFeedbacks = feedbacks.filter((item) => item.daily_Quote);

  // Sorting logic based on rating
  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.daily_Quote.rating - b.daily_Quote.rating;
    } else if (sortOrder === "desc") {
      return b.daily_Quote.rating - a.daily_Quote.rating;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedFeedbacks.length / cardsPerPage);
  const displayedFeedbacks = sortedFeedbacks.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  const handleChange = (_, value) => {
    setPage(value);
  };

  const handleModal = (item) => {
    setSelectedFeedback(item);
    setShow(true);
  };

  return (
    <Box width="100%">
      <Typography
        fontSize="32px"
        color="blue"
        sx={{ fontWeight: 600 }}
        mt={2}
        mb={3}
      >
        Daily Feedbacks
      </Typography>
      <Box width="100%" display="flex" gap="10px" alignItems="center">
        {/* Select Month */}
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ width: "30%", height: "50px" }}
        >
          {[
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
          ].map((m, index) => (
            <MenuItem
              key={m}
              value={m}
              disabled={index > new Date().getMonth()}
            >
              {m}
            </MenuItem>
          ))}
        </Select>

        {/* Sorting Dropdown */}
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          displayEmpty
          sx={{ width: "30%", height: "50px" }}
        >
          <MenuItem value="">Sort by Rating</MenuItem>
          <MenuItem value="asc">Lowest to Highest</MenuItem>
          <MenuItem value="desc">Highest to Lowest</MenuItem>
        </Select>
      </Box>

      {/* Feedback Cards */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        gap="10px"
        mt={5}
      >
        {displayedFeedbacks.map((item, index) => (
          <Box
            key={index}
            width="calc(45% - 5px)"
            height="80px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            borderRadius="5px"
            p={2}
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          >
            <Box display="flex" width="90%" justifyContent="space-between">
              <Typography variant="body2">{item.date}</Typography>
              <RiEyeLine
                fontSize="22px"
                color="blue"
                cursor="pointer"
                onClick={() => handleModal(item)}
              />
            </Box>
            <Typography
              sx={{ fontWeight: "600", fontSize: "16px", textAlign: "center" }}
            >
              {item.daily_Quote?.phrase}
            </Typography>
            <Rating
              name="read-only-rating"
              value={item.daily_Quote?.rating}
              readOnly
              precision={0.5}
              size="small"
            />
          </Box>
        ))}
      </Box>

      {show && (
        <MonthlyFeedbackModal
          feedback={selectedFeedback}
          show={show}
          setShow={setShow}
        />
      )}

      {totalPages > 1 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Box>
      )}
    </Box>
  );
}

export default MonthlyFeedbacks;
