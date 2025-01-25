import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from "@mui/material";
import Rating from "@mui/material/Rating";

function DailyFeedbackModal({ open, handleClose }) {
  const [rating, setRating] = useState(0);
  const [responses, setResponses] = useState({
    overallDay: "",
    mood: "",
    productivity: "",
    interactions: "",
    energy: "",
  });

  const handleResponseChange = (question, value) => {
    setResponses((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Feedback Submitted:", { rating, responses });
    handleClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Daily Feedback</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="h6">Rate your day:</Typography>
          <Rating
            name="daily-rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel>How was your day overall?</FormLabel>
          <RadioGroup
            value={responses.overallDay}
            onChange={(e) => handleResponseChange("overallDay", e.target.value)}
          >
            <FormControlLabel value="Amazing" control={<Radio />} label="Amazing" />
            <FormControlLabel value="Good" control={<Radio />} label="Good" />
            <FormControlLabel value="Average" control={<Radio />} label="Average" />
            <FormControlLabel value="Not Bad" control={<Radio />} label="Not Bad" />
            <FormControlLabel value="Bad" control={<Radio />} label="Bad" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel>What was your mood for most of the day?</FormLabel>
          <RadioGroup
            value={responses.mood}
            onChange={(e) => handleResponseChange("mood", e.target.value)}
          >
            <FormControlLabel value="Happy" control={<Radio />} label="Happy" />
            <FormControlLabel value="Calm" control={<Radio />} label="Calm" />
            <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
            <FormControlLabel value="Stressed" control={<Radio />} label="Stressed" />
            <FormControlLabel value="Sad" control={<Radio />} label="Sad" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel>Did you feel productive today?</FormLabel>
          <RadioGroup
            value={responses.productivity}
            onChange={(e) => handleResponseChange("productivity", e.target.value)}
          >
            <FormControlLabel value="Very Productive" control={<Radio />} label="Very Productive" />
            <FormControlLabel value="Somewhat Productive" control={<Radio />} label="Somewhat Productive" />
            <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
            <FormControlLabel value="Not Productive" control={<Radio />} label="Not Productive" />
            <FormControlLabel value="Wasted Day" control={<Radio />} label="Wasted Day" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel>How were your interactions with others?</FormLabel>
          <RadioGroup
            value={responses.interactions}
            onChange={(e) => handleResponseChange("interactions", e.target.value)}
          >
            <FormControlLabel value="Great" control={<Radio />} label="Great" />
            <FormControlLabel value="Good" control={<Radio />} label="Good" />
            <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
            <FormControlLabel value="Not Great" control={<Radio />} label="Not Great" />
            <FormControlLabel value="Avoided People" control={<Radio />} label="Avoided People" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel>What’s your energy level at the end of the day?</FormLabel>
          <RadioGroup
            value={responses.energy}
            onChange={(e) => handleResponseChange("energy", e.target.value)}
          >
            <FormControlLabel value="Full of Energy" control={<Radio />} label="Full of Energy" />
            <FormControlLabel value="Balanced" control={<Radio />} label="Balanced" />
            <FormControlLabel value="Tired" control={<Radio />} label="Tired" />
            <FormControlLabel value="Exhausted" control={<Radio />} label="Exhausted" />
            <FormControlLabel value="Drained" control={<Radio />} label="Drained" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DailyFeedbackModal;
