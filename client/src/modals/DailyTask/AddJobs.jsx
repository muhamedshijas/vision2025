import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function AddJobs({ setShowAddModal, showAddModal, userId }) {
  const dispatch = useDispatch();
  const [appliedThrough, setAppliedThrough] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Set today's date initially
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState(""); // For dropdown
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState("Pending"); // New state for job status

  const handleClose = () => {
    setShowAddModal(!showAddModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload
    const payload = {
      date,
      company,
      designation,
      place,
      appliedThrough,
      userId,
      status, // Include job status
    };

    // Include email only if appliedThrough is "Email"
    if (appliedThrough === "Email") {
      payload.email = email;
    }

    try {
      const result = await axios.post("/daily-task/add-job", payload);
      console.log("Job added successfully:", result.data);
      dispatch({ type: "refresh" });
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding job:", error);
    }
    
  };

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
          width="400px"
        >
          <Typography variant="h6" mb={2}>
            Add Job
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  fullWidth
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Place"
                  required
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  displayEmpty
                  required
                >
                  <MenuItem value="" disabled>
                    Select Designation
                  </MenuItem>
                  <MenuItem value="Full Stack Developer">
                    Full Stack Developer
                  </MenuItem>
                  <MenuItem value="MERN Stack Developer">
                    MERN Stack Developer
                  </MenuItem>
                  <MenuItem value="Front End Developer">
                    Front End Developer
                  </MenuItem>
                  <MenuItem value="Back End Developer">
                    Back End Developer
                  </MenuItem>
                  <MenuItem value="React JS Developer">
                    React JS Developer
                  </MenuItem>
                  <MenuItem value="Node JS Developer">
                    Node JS Developer
                  </MenuItem>
                  <MenuItem value="Web Developer">Web Developer</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  value={appliedThrough}
                  onChange={(e) => setAppliedThrough(e.target.value)}
                  displayEmpty
                  required
                >
                  <MenuItem value="" disabled>
                    Applied through
                  </MenuItem>
                  <MenuItem value="Naukri">Naukri</MenuItem>
                  <MenuItem value="Indeed">Indeed</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                </Select>
              </Grid>
              {appliedThrough === "Email" && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Select
                  fullWidth
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  displayEmpty
                  required
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Call Backed">Call Backed</MenuItem>
                  <MenuItem value="Waiting List">First Interview Done</MenuItem>
                  <MenuItem value="Waiting List">Tech Interview Done</MenuItem>
                  <MenuItem value="Waiting List">Placed</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
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
                style={{ width: "150px" }}
                onClick={handleClose}
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

export default AddJobs;
