import { Box, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { PiClockFill } from "react-icons/pi";
import {
  RiCalendarScheduleFill,
  RiFlagFill,
  RiUserHeartFill,
} from "react-icons/ri";
import { useDispatch } from "react-redux";


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
            <PiClockFill fontSize="180px" />
            Daily Task
          </Box>
          {/* Box 2 */}
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
            <RiCalendarScheduleFill fontSize="180px" />
            Monthly Task
          </Box>
          {/* Box 3 */}
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
            <RiFlagFill fontSize="180px" />
            Annual Task
          </Box>
          {/* Box 4 */}
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
            <RiUserHeartFill fontSize="180px" />
            Personal Data
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
