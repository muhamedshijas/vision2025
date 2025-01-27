import React, { useEffect, useState } from "react";
import { Box, Typography, Rating, Button } from "@mui/material"; // Import Rating component from MUI
import DailyFeedbackModal from "../../modals/DailyTask/DailyFeedbackModal";
import { useSelector } from "react-redux";
import axios from "axios";

function DailyQuotes() {
  const [show, setShow] = useState(false);
  const [dailyFeedback, setDailyFeedBack] = useState({});
  const refresh = useSelector((state) => state.refresh);
  const user = useSelector((state) => state.user.detials);
  const userId = user._id;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = yesterday.toISOString().split("T")[0];
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`daily-task/get-feedback/${userId}`);

        setDailyFeedBack(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (userId) {
      fetchFeedback();
    }
  }, [userId, refresh]);

  const handleModal = () => {
    setShow(!show);
  };

  return (
    <div style={{ height: "100%" }}>
      {dailyFeedback === null || Object.keys(dailyFeedback).length === 0 ? (
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <Typography
            sx={{ fontWeight: 600, fontSize: "25px", color: "slateblue" }}
          >
            NO DATA AVAILABLE
          </Typography>{" "}
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              width: "200PX",
            }}
            onClick={handleModal}
          >
            UPDATE DATA
          </Button>
        </Box>
      ) : (
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="30px"
        >
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: 600,
            }}
          >
            Feedback of {formattedDate}
          </Typography>
          <Box
            height="150px"
            width="90%"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="10px"
          >
            <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
              PHRASE THAT MAKE THIS DAY MEMORABLE
            </Typography>
            <Typography sx={{ fontSize: "20px" }}>
              {dailyFeedback.phrase == "" ? "no data" : dailyFeedback.phrase}
            </Typography>
          </Box>

          <Box
            display="flex"
            width="90%"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box
              width="250px"
              height="180px"
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="10px"
            >
              <Typography sx={{ fontWeight: 600, fontSize: "25px" }}>
                OVERALL DAY
              </Typography>
              <Typography>
                {dailyFeedback.overAll == ""
                  ? "no data"
                  : dailyFeedback.overAll}
              </Typography>
            </Box>
            <Box
              width="250px"
              height="180px"
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="10px"
            >
              <Typography sx={{ fontWeight: 600, fontSize: "25px" }}>
                PRODUCTIVITY
              </Typography>
              <Typography>
                {dailyFeedback.productivity == ""
                  ? "No data"
                  : dailyFeedback.productivity}
              </Typography>
            </Box>
            <Box
              width="250px"
              height="180px"
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="10px"
            >
              <Typography sx={{ fontWeight: 600, fontSize: "25px" }}>
                INTERACTION
              </Typography>
              <Typography>
                {dailyFeedback.interaction == ""
                  ? "No data"
                  : dailyFeedback.interaction}
              </Typography>
            </Box>
          </Box>

          {/* Rating Box */}
          <Box
            padding="10px"
            height="40px"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="10px"
          >
            <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
              Rating of the day :
            </Typography>
            {/* Rating component */}
            <Rating
              name="read-only-rating"
              value={dailyFeedback.rating} // The value of the rating
              readOnly
              precision={0.5} // Allows half-star ratings (optional)
            />
          </Box>
        </Box>
      )}
      {show && (
        <DailyFeedbackModal show={show} setShow={setShow} userId={userId} />
      )}
    </div>
  );
}

export default DailyQuotes;
