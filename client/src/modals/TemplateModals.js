import { Box, Button, Typography } from "@mui/material";
import React from "react";

function TemplateModals({ setTemplateShow, templateShow }) {
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
        {/* Modal Header */}
        <Typography variant="h6" fontWeight="bold">
          Download Templates
        </Typography>

        {/* Resume Section */}
        <Button
          variant="outlined"
          style={{
            width: "160px",
            borderColor: "black",
            color: "black",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Resume
        </Button>

        {/* Cover Letters Section */}
        <Typography
          variant="body1"
          fontWeight="bold"
          style={{ textTransform: "uppercase" }}
        >
          Cover Letters
        </Typography>

        {/* Buttons Section */}
        <Box display="flex" flexWrap="wrap" gap="10px" width="100%">
          <Button
            variant="outlined"
            style={{
              width: "160px",
              borderColor: "black",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            MERN
          </Button>
          <Button
            variant="outlined"
            style={{
              width: "160px",
              borderColor: "black",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Full Stack
          </Button>
          <Button
            variant="outlined"
            style={{
              width: "160px",
              borderColor: "black",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            React JS
          </Button>
          <Button
            variant="outlined"
            style={{
              width: "160px",
              borderColor: "black",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Web Developer
          </Button>
          <Button
            variant="outlined"
            style={{
              width: "160px",
              borderColor: "black",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Node JS
          </Button>
        </Box>

        {/* Close Button */}
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
