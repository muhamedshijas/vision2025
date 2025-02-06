import { Box, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import dailyTask from "../../assets/icons/daily.png";
import monthlyTask from "../../assets/icons/monthly.png";
import annualTask from "../../assets/icons/annual.png";
import personal from "../../assets/icons/user.png";
import { PiClockFill } from "react-icons/pi";
import {
  RiCalendarScheduleFill,
  RiFlagFill,
  RiUserHeartFill,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  async function handleLogout(e) {
    e.preventDefault();
    await axios.get("/auth/logout");
    dispatch({ type: "refresh" });
  }
  return (
    <div style={{ height: "100vh" }}>
      <Box
        width="90%"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        marginTop="10px"
      >
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* Container for the grid */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap="10px" // Space between boxes
          maxWidth="50%" // Adjust max width for proper layout
        >
          {/* Box 1 */}
          <Link to="/dailytask" style={{ textDecoration: "none" }}>
            <Box
              height="230px"
              width="230px"
              borderRadius="22px"
              bgcolor="#759EB8"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              color="white"
              fontWeight="bold"
              fontSize="22px"
            >
              <img src={dailyTask} height="180px" width="180px" />
              Daily Task
            </Box>
          </Link>
          {/* Box 2 */}
          <Link to="/monthlytask" style={{ textDecoration: "none" }}>
            <Box
              height="230px"
              width="230px"
              borderRadius="22px"
              bgcolor="#7392B7"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              color="white"
              fontWeight="bold"
              fontSize="22px"
            >
              <img src={monthlyTask} height="150px" width="150px" />
              Monthly Task
            </Box>
          </Link>
          {/* Box 3 */}
          <Link to="/annualtask" style={{ textDecoration: "none" }}>
            <Box
              height="230px"
              width="230px"
              borderRadius="22px"
              bgcolor="#B3C5D7"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              color="white"
              fontWeight="bold"
              fontSize="22px"
            >
              <img src={annualTask} height="180px" width="180px" />
              Annual Task
            </Box>
          </Link>
          {/* Box 4 */}
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Box
              height="230px"
              width="230px"
              borderRadius="22px"
              bgcolor="#759EB8"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              color="white"
              fontWeight="bold"
              fontSize="22px"
            >
              <img src={personal} height="180px" width="180px" />
              Personal Data
            </Box>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
