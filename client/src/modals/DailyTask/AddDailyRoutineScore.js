import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Typography,
  FormControlLabel,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { calculateSleepDuration } from "../../utilities/timeCalculation";

function AddDailyRoutineScore({
  showRoutineModal,
  setShowRoutineModal,
  userId,
}) {
  const [bedTime, setBedTime] = useState(null);
  const [wakeUpTime, setWakeUpTime] = useState(null);

  const handleModal = () => {
    setShowRoutineModal(!showRoutineModal);
  };

  // State for food intake
  const [foodIntake, setFoodIntake] = useState({
    bedTea: false,
    breakfast: false,
    midMorningSnack: false,
    lunch: false,
    eveningSnack: false,
    dinner: false,
    hotelFood: false,
  });

  const handleFoodChange = (event) => {
    setFoodIntake({ ...foodIntake, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert foodIntake object into an array of selected food items
    const foods = Object.keys(foodIntake).filter((key) => foodIntake[key])

    // Calculate total sleep duration
    let totalSleepDuration = calculateSleepDuration(bedTime, wakeUpTime);

    await axios.post("daily-task/add-daily-health-data", {
      bedTime,
      wakeUpTime,
      foods: foods,
      userId,
    });
    setShowRoutineModal(!showRoutineModal);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <TimePicker
                label="Bed Time"
                value={bedTime}
                onChange={(newValue) => setBedTime(newValue)}
                ampm
                slotProps={{ textField: { fullWidth: true, sx: { mt: 1 } } }}
              />
              <TimePicker
                label="Wake Up Time"
                value={wakeUpTime}
                onChange={(newValue) => setWakeUpTime(newValue)}
                ampm
                slotProps={{ textField: { fullWidth: true, sx: { mt: 1 } } }}
              />
            </Box>

            {/* Food Score Section */}
            <Box mb={2} width="100%">
              <Typography>Food Score</Typography>
              <Grid
                container
                spacing={1}
                justifyContent="flex-start"
                width="100%"
              >
                {Object.keys(foodIntake).map((food) => (
                  <Grid item xs={6} key={food}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={food}
                          checked={foodIntake[food]}
                          onChange={handleFoodChange}
                        />
                      }
                      label={food
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Submit Button */}
            <Box width="100%" display="flex" justifyContent="space-around">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "180px",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "180px",
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                }}
                onClick={handleModal}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default AddDailyRoutineScore;
