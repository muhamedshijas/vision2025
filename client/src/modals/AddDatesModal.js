import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDatesModal({ show, setShow, userId }) {
  const handleClose = () => {
    setShow(false);
  };

  const navigate = useNavigate();
  const [dates, setDates] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(description, dates);

    try {
      const result = await axios.post("/profile/adddates", {
        userId,
        dates,
        description,
      });

      if (result && result.data && !result.data.err) {
        // Success: Navigate to profile page
       console.log(result);
       
        handleClose();
      } else {
        // Handle error response from server
        console.error(
          "Error adding password:",
          result.data?.err || "Unknown error"
        );
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
            ADD Dates
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Row 1: Account Name */}
              <Grid item xs={12}>
                <TextField
                  type="date"
                  fullWidth
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  required
                />
              </Grid>

              {/* Row 2: Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
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

export default AddDatesModal;
