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
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import React, { useState } from "react";

function AddJobModal({ jobAddModal, setJobAddModal, userId }) {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [projects, setProjects] = useState([""]);

  async function handleSubmit(e) {
    e.preventDefault();

    const timePeriod = `${startMonth} ${startYear} to ${endMonth} ${endYear}`;
    const data = await axios.post("/profile/addjob", {
      jobTitle,
      company,
      packageValue,
      location,
      timePeriod,
      projects,
      userId
    });
    // Pass the data to the parent component
    setJobAddModal(!jobAddModal);
  }

  const handleProjectChange = (index, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = value;
    setProjects(updatedProjects);
  };

  const addProjectField = () => {
    setProjects([...projects, ""]);
  };

  const removeProjectField = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleClose = () => {
    setJobAddModal(!jobAddModal);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(new Array(50), (_, i) => 2000 + i); // Years from 2000 to 2049

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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Place"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Package"
                value={packageValue}
                onChange={(e) => setPackageValue(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Start Month</InputLabel>
                <Select
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  required
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Start Year</InputLabel>
                <Select
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  required
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>End Month</InputLabel>
                <Select
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  required
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>End Year</InputLabel>
                <Select
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  required
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Projects
              </Typography>
              {projects.map((project, index) => (
                <Box display="flex" alignItems="center" key={index}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label={`Project ${index + 1}`}
                    value={project}
                    onChange={(e) => handleProjectChange(index, e.target.value)}
                    required
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeProjectField(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={addProjectField}
                sx={{ marginTop: "10px" }}
              >
                Add Project
              </Button>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" marginTop={3}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default AddJobModal;
