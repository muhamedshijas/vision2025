import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";

// Import flat icons
import personalIcon from "../../assets/icons/user.png";
import jobsIcon from "../../assets/icons/jobs.png";
import passwordsIcon from "../../assets/icons/password.png";
import datesIcon from "../../assets/icons/dates.png";
import visionBoardIcon from "../../assets/icons/visionBoard.png";
import avatar from "../../assets/icons/userAvatar.png";

function ProfileSidebar({ activeSection, setActiveSection }) {
  const user = useSelector((state) => state.user.details);

  // Icon mapping for each section
  const sectionIcons = {
    Personal: personalIcon,
    Jobs: jobsIcon,
    Passwords: passwordsIcon,
    Dates: datesIcon,
    "Vision Board": visionBoardIcon,
  };

  return (
    <Box
      width="300px"
      bgcolor="#759EB8"
      display="flex"
      flexDirection="column"
      paddingTop="20px"
      borderRadius="8px 0 0 8px"
    >
      {/* Back Button */}
      <Typography style={{ paddingLeft: "10px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <RiArrowDropLeftLine style={{ fontWeight: 600, fontSize: "22px" }} />
        </Link>
      </Typography>

      {/* User Profile Section */}
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          height="200px"
          width="200px"
          borderRadius="50%"
          bgcolor="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src={avatar} width="150px" height="150px" />
        </Box>
        <Typography
          style={{ fontWeight: 700, marginTop: "5px", color: "white" }}
        >
          {user?.name}
        </Typography>
        <Typography style={{ fontWeight: 700, color: "white" }}>
          {user?.email}
        </Typography>
      </Box>

      {/* Sidebar Menu */}
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
        {["Personal", "Jobs", "Passwords", "Dates", "Vision Board"].map(
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
                    : "rgba(255, 255, 255, 0.1)",
                borderRadius: "5px 0px 0px 5px",
                color: activeSection === section ? "#759EB8" : "white",
                cursor: "pointer",
              }}
              sx={{
                fontWeight: activeSection === section ? "normal" : "bold",
              }}
              onClick={() => setActiveSection(section)}
            >
              {/* Icon + Text */}
              <Box display="flex" alignItems="center" gap={1}>
                <img
                  src={sectionIcons[section]}
                  alt={section}
                  style={{ width: "30px", height: "30px" }}
                />
                <ListItemText
                  primary={section}
                  sx={{
                    fontWeight: 800,
                    color: activeSection === section ? "#759EB8" : "white",
                    fontSize: "20px",
                  }}
                />
              </Box>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
}

export default ProfileSidebar;
