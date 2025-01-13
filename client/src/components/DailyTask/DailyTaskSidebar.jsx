import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { PiClockFill } from "react-icons/pi";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function DailyTaskSideBar({ activeSection, setActiveSection }) {

  return (
    <Box
      width="300px"
      bgcolor="#759EB8"
      display="flex"
      flexDirection="column"
      paddingTop="20px"
      borderRadius="8px 0 0 8px"
    >
      <Typography style={{ paddingLeft: "10px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <RiArrowDropLeftLine style={{ fontWeight: 600, fontSize: "22px" }} />
        </Link>
      </Typography>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <PiClockFill
          color="white"
          fontSize="185px"
        />
        <Typography
          style={{ fontWeight: 700, marginTop: "5px", color: "white" }}
        >
         Daily Tasks
        </Typography>
      </Box>
      <List
        style={{
          marginTop: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {["Relgious", "Entertainment", "Jobs", "Daily Report"].map(
          (section, index) => (
            <ListItem
              key={index}
              button
              style={{
                marginBottom: "10px",
                width: "98%",
                backgroundColor:
                  activeSection === section
                    ? "white"
                    : "rgba(255, 255, 255, 0.1)", // Change background color for active section
                borderRadius: "5px 0px 0px 5px",
                color: activeSection === section ? "#759EB8" : "white",
                cursor: "pointer",
              }}
              sx={{
                fontWeight: activeSection === section ? "normal" : "bold", // Set bold for non-active sections
              }}
              onClick={() => setActiveSection(section)}
            >
              <ListItemText
                primary={section}
                sx={{
                  fontWeight: 800,
                  color: activeSection === section ? "#759EB8" : "white", // Ensure color consistency
                  fontSize: "20px", // Font size to apply to each sectio
                }}
              />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
}

export default DailyTaskSideBar;
