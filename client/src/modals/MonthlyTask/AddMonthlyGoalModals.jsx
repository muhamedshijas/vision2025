import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMonthlyGoalsModals({ show, setShow, userId }) {
  const handleClose = () => {
    setShow(!show);
  };

  const navigate = useNavigate();
  const [goal, setGoal] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {


      const result = await axios.post("/monthly-task/add-goal", {
        goal,
        userId,
      });
      if (!result.err) {
        setShow(!show);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  }

  return (
    <div>
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
        zIndex={1300}
      >
        <Box
          bgcolor="white"
          p={4}
          borderRadius="6px"
          boxShadow="0 0 10px rgba(0,0,0,0.3)"
          marginLeft="200px"
          width="400px"
        >
          <Typography variant="h6" mb={2}>
            Add New Goal
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Row 2: Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Goal"
                  required
                  value={goal}
                  onChange={(e) => {
                    setGoal(e.target.value);
                  }}
                />
              </Grid>
            </Grid>

            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                type="submit"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  width: "150px",
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="black"
                onClick={handleClose}
                style={{ width: "150px" }}
              >
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default AddMonthlyGoalsModals;
