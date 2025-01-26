import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
function DailyFeedbackModal() {
  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0px"
      top="0px"
      bgcolor="rgba(5, 5, 5, 0.141)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius="6px"
        boxShadow="0 0 10px rgba(0,0,0,0.3)"
        width="500px"
        maxHeight="80vh"
        overflow="auto"
      >
        <Typography variant="h6" mb={2}>
          Add Job Details
        </Typography>
      
      </Box>
    </Box>
  );
}

export default DailyFeedbackModal;
