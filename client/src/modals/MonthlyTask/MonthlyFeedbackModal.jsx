import { Box, Button, Rating, Typography, Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import React from "react";

function MonthlyFeedbackModal({ feedback, show, setShow }) {
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
          {`Details of ${feedback.date}`}
        </Typography>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Phrase of the Day</TableCell>
                <TableCell>{feedback.daily_Quote.phrase}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Overall Day Experience</TableCell>
                <TableCell>{feedback.daily_Quote.overAll}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Interaction with Others</TableCell>
                <TableCell>{feedback.daily_Quote.interaction}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Productivity</TableCell>
                <TableCell>{feedback.daily_Quote.productivity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Rating</TableCell>
                <TableCell>
                  <Rating name="read-only-rating" value={feedback.daily_Quote.rating} readOnly precision={0.5} size="small" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>


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

export default MonthlyFeedbackModal;
