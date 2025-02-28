import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

function MonthlyScoreModal({ show, setShow, selectedId }) {
  const id = selectedId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/monthly-task/get-scoresbyid/${id}`);
      } catch (error) {}
    };

    if (id) {
      fetchData();
    }
  }, [selectedId]);
  const handleClose = () => {
    setShow(!show);
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0"
      top="0"
      bgcolor="rgba(5, 5, 5, 0.141)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={1300}
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius="6px"
        boxShadow="0 0 10px rgba(0,0,0,0.3)"
        width="500px"
        maxHeight="80vh"
        display="flex"
        flexDirection="column"
        overflow="auto"
        gap="15px"
      >
        <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">
          {`Details of ${selectedId}`}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleClose}
          sx={{ bgcolor: "black", color: "white", alignSelf: "center", mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default MonthlyScoreModal;
