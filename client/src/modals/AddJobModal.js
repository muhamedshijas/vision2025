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
} from "@mui/material";
import React, { useState } from "react";

function AddJobModal({ jobAddModal, setJobAddModal,onSubmit }) {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    company: "",
    place: "",
    package: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    projects: [""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectChange = (index, value) => {
    const updatedProjects = [...jobDetails.projects];
    updatedProjects[index] = value;
    setJobDetails((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
  };

  const addProjectField = () => {
    setJobDetails((prev) => ({
      ...prev,
      projects: [...prev.projects, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(jobDetails); // Pass the data to the parent component
    setJobAddModal(!jobAddModal);
  };
  const handlClose = () => {
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
                name="jobTitle"
                value={jobDetails.jobTitle}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={jobDetails.company}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Place"
                name="place"
                value={jobDetails.place}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Package"
                name="package"
                value={jobDetails.package}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Start Month</InputLabel>
                <Select
                  name="startMonth"
                  value={jobDetails.startMonth}
                  onChange={handleInputChange}
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
                  name="startYear"
                  value={jobDetails.startYear}
                  onChange={handleInputChange}
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
                  name="endMonth"
                  value={jobDetails.endMonth}
                  onChange={handleInputChange}
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
                  name="endYear"
                  value={jobDetails.endYear}
                  onChange={handleInputChange}
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
              {jobDetails.projects.map((project, index) => (
                <TextField
                  key={index}
                  fullWidth
                  margin="dense"
                  label={`Project ${index + 1}`}
                  value={project}
                  onChange={(e) => handleProjectChange(index, e.target.value)}
                  required
                />
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
            <Button variant="outlined" color="secondary" onClick={handlClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default AddJobModal;
