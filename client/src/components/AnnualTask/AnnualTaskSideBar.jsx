import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import annualTaskIcon from "../../assets/icons/annual.png";
import { RiArrowDropLeftLine } from "react-icons/ri"; // Import arrow icon
import { Link } from "react-router-dom";
import jobApplication from "../../assets/icons/jobs.png";
import dailyFeedback from "../../assets/icons/feedback.png";
import relgious from "../../assets/icons/praying.png";
import dailyReport from "../../assets/icons/report.png";
import dailyRotine from "../../assets/icons/routine.png";

function AnnualTaskSideBar({ activeSection, setActiveSection }) {
  // Icon mapping for each section
  const sectionIcons = {
    Relgious: relgious,
    "Daily Routine": dailyRotine,
    Jobs: jobApplication,
    Feedback: dailyFeedback,
    "Daily Report": dailyReport,
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
        <img
          src={annualTaskIcon}
          width="180px"
          height="170px"
          alt="Daily Task"
        />
        <Typography
          style={{ fontWeight: 700, marginTop: "5px", color: "white" }}
        >
          Annual Task
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
        {["Relgious", "Jobs", "Daily Routine", "Feedback"].map(
          (section, index) => (
            <ListItem
              key={index}
              button
              style={{
                fontWeight: 900,
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
              onClick={() => setActiveSection(section)}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {/* Display icon with 20px size */}
                <img
                  src={sectionIcons[section]}
                  alt={section}
                  style={{ width: "30px", height: "30px" }}
                />
                <ListItemText
                  primary={section}
                  sx={{
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

export default AnnualTaskSideBar;
