import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import axios from "axios";

function DailyFeedbackModal({ show, setShow, userId }) {
  const [overAll, setOverall] = useState("");
  const [interaction, setInteraction] = useState("");
  const [productivity, setProductivity] = useState("");
  const [rating, setRating] = useState(null);
  const [phrase, setPhrase] = useState("");

  const handleModal = () => {
    setShow(!show);
  };
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = yesterday.toISOString().split("T")[0];
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await axios.post("/daily-task/add-daily-feedback", {
      productivity,
      rating,
      overAll,
      phrase,
      date: formattedDate,
      userId,
      interaction
    });
  }
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
        p={2}
        borderRadius="6px"
        boxShadow="0 0 10px rgba(0,0,0,0.3)"
        width="500px"
        maxHeight="90vh"
        overflow="auto"
      >
        <Typography variant="h5" mb={3} textAlign="center">
          UPDATE FEEDBACK
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Day Overall */}
          <FormControl fullWidth margin="normal">
            <Typography variant="body1">
              1. How was your day overall?
            </Typography>
            <RadioGroup
              row
              value={overAll}
              onChange={(e) => setOverall(e.target.value)}
            >
              <FormControlLabel
                value="Amazing"
                control={<Radio />}
                label="AMAZING"
              />
              <FormControlLabel value="Good" control={<Radio />} label="GOOD" />
              <FormControlLabel
                value="Average"
                control={<Radio />}
                label="AVERAGE"
              />
              <FormControlLabel value="bad" control={<Radio />} label="BAD" />
            </RadioGroup>
          </FormControl>

          {/* Interaction */}
          <FormControl fullWidth margin="normal">
            <Typography variant="body1">
              2. How was your interaction with others?
            </Typography>
            <RadioGroup
              row
              value={interaction}
              onChange={(e) => setInteraction(e.target.value)}
            >
              <FormControlLabel
                value="Great"
                control={<Radio />}
                label="Great"
              />
              <FormControlLabel value="good" control={<Radio />} label="GOOD" />
              <FormControlLabel
                value="Neutral"
                control={<Radio />}
                label="Neutral"
              />
              <FormControlLabel
                value="Avoid People"
                control={<Radio />}
                label="Avoid People"
              />
            </RadioGroup>
          </FormControl>

          {/* Productivity */}
          <FormControl fullWidth margin="normal">
            <Typography variant="body1">3. Did you feel productive?</Typography>
            <RadioGroup
              row
              value={productivity}
              onChange={(e) => setProductivity(e.target.value)}
            >
              <FormControlLabel
                value="Productive"
                control={<Radio />}
                label="Productive"
              />
              <FormControlLabel
                value="Neutral"
                control={<Radio />}
                label="Neutral"
              />
              <FormControlLabel
                value="Wasted Day"
                control={<Radio />}
                label="Wasted Day"
              />
            </RadioGroup>
          </FormControl>

          {/* Rating */}
          <FormControl fullWidth margin="normal">
            <Typography variant="body1">4. Rate Your Day</Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              precision={0.5} // Allows half-star ratings
            />
          </FormControl>

          {/* Memorable Phrase */}
          <FormControl fullWidth margin="normal">
            <Typography variant="body1">
              5. A phrase that made this day memorable
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              placeholder="Write here..."
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
          </FormControl>

          <Box mt={3} width="100%" display="flex" justifyContent="space-around">
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "black", color: "white", width: "150px" }}
            >
              UPDATE
            </Button>
            <Button
              type="button"
              color="secondary"
              onClick={handleModal}
              sx={{
                bgcolor: "white",
                color: "black",
                border: "2px solid",
                width: "150px",
                boxShadow: "none",
                fontWeight: 600,
              }}
            >
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default DailyFeedbackModal;
