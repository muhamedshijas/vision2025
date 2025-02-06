import { Box, Button, Typography } from "@mui/material";
import React from "react";
import coverLetterTemplates from "../assets/letters";

function TemplateModals({ setTemplateShow, templateShow }) {
  // Function to copy text to clipboard
  const handleCopy = (category) => {
    const text = coverLetterTemplates[category] || "No template found!";
    navigator.clipboard
      .writeText(text)
      .then(() => alert(`Copied ${category} Cover Letter!`))
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0px"
      top="0px"
      bgcolor="rgba(0, 0, 0, 0.5)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius="6px"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
        width="500px"
        display="flex"
        flexDirection="column"
        gap="20px"
      >
        <Typography variant="h6" fontWeight="bold">
          Download Templates
        </Typography>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            Resume
          </Typography>
          <Button
          variant="contained"
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
              width:"250px"
            }}
          >
            Resume
          </Button>
        </Box>
        <Typography
          variant="body1"
          fontWeight="bold"
          style={{ textTransform: "uppercase" }}
        >
          Cover Letters
        </Typography>

        <Box display="flex" flexWrap="wrap" gap="10px" width="100%">
          {Object.keys(coverLetterTemplates).map((category) => (
            <Button
              key={category}
              variant="outlined"
              style={{
                borderColor: "black",
                color: "black",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
              onClick={() => handleCopy(category)}
            >
              {category}
            </Button>
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={() => setTemplateShow(false)}
          style={{
            backgroundColor: "black",
            color: "white",
            textTransform: "uppercase",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default TemplateModals;
