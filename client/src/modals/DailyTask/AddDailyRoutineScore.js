import { Box, Checkbox, TextField, Typography, FormControlLabel, Button } from "@mui/material";
import React, { useState } from "react";

// Helper function to convert 24-hour time format to 12-hour format
const convertTo12HrFormat = (time) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const isPM = hour >= 12;
  const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
  const formattedTime = `${hour12}:${minutes} ${isPM ? "PM" : "AM"}`;
  return formattedTime;
};

function AddDailyRoutineScore() {
  const [bedTime, setBedTime] = useState(""); // Bedtime
  const [wakeUpTime, setWakeUpTime] = useState(""); // Wake up time
  const [afterNap, setAfterNap] = useState(false); // State to track "After non-nap" checkbox
  const [updatedBedTime, setUpdatedBedTime] = useState(""); // Updated Bedtime
  const [updatedWakeUpTime, setUpdatedWakeUpTime] = useState(""); // Updated Wake Up Time

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!", {
      bedTime: convertTo12HrFormat(bedTime),
      wakeUpTime: convertTo12HrFormat(wakeUpTime),
      updatedBedTime: updatedBedTime ? convertTo12HrFormat(updatedBedTime) : null,
      updatedWakeUpTime: updatedWakeUpTime ? convertTo12HrFormat(updatedWakeUpTime) : null,
    });
  };

  const handleAfterNapChange = (event) => {
    setAfterNap(event.target.checked); // Update state when checkbox is clicked
  };

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
        width="400px"
      >
        <Typography variant="h6" mb={2}>
          Add Daily Routine Score
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Sleep Score Section */}
          <Box mb={2}>
            <Typography>Sleep Score</Typography>
            <TextField
              label="Bed Time"
              type="text"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
              placeholder="hh:mm AM/PM"
            />
            <TextField
              label="Wake Up Time"
              type="text"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
              placeholder="hh:mm AM/PM"
            />

            {/* After non-nap Checkbox */}
            <FormControlLabel
              control={<Checkbox checked={afterNap} onChange={handleAfterNapChange} />}
              label="After non-nap"
            />

            {/* Conditionally render additional fields if "After non-nap" is checked */}
            {afterNap && (
              <Box mt={2}>
                <Typography variant="body1">Update Wake Up and Bed Time</Typography>
                <TextField
                  label="Updated Bed Time"
                  type="text"
                  value={updatedBedTime}
                  onChange={(e) => setUpdatedBedTime(e.target.value)}
                  fullWidth
                  sx={{ mt: 1 }}
                  placeholder="hh:mm AM/PM"
                />
                <TextField
                  label="Updated Wake Up Time"
                  type="text"
                  value={updatedWakeUpTime}
                  onChange={(e) => setUpdatedWakeUpTime(e.target.value)}
                  fullWidth
                  sx={{ mt: 1 }}
                  placeholder="hh:mm AM/PM"
                />
              </Box>
            )}
          </Box>

          {/* Food Score Section */}
          <Box mb={2}>
            <Typography>Food Score</Typography>
            <FormControlLabel control={<Checkbox />} label="Breakfast" />
            <FormControlLabel control={<Checkbox />} label="Mid Morning Snack" />
            <FormControlLabel control={<Checkbox />} label="Lunch" />
            <FormControlLabel control={<Checkbox />} label="Evening Snack" />
            <FormControlLabel control={<Checkbox />} label="Dinner" />
            <FormControlLabel control={<Checkbox />} label="Hotel Food" />
          </Box>

          {/* Submit Button */}
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AddDailyRoutineScore;
