import { Box, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

function ProfileSidebar({ activeSection, setActiveSection }) {
  return (
    <Box
      width="300px"
      bgcolor="#759EB8"
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingTop="20px"
      borderRadius="8px 0 0 8px"
    >
      <Box
        height="200px"
        width="200px"
        borderRadius="180px"
        bgcolor="white"
      ></Box>

      <List
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {["Personal", "Passwords", "Jobs", "Dates", "Vision Board"].map(
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

export default ProfileSidebar;
