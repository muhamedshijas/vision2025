import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";
import { Button } from "@mui/material";

function LinearProgressWithLabel({ value }) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function Jobs() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "ABC Corp",
      designation: "Software Engineer",
      applied_through: "Indeed",
      application_status: "Pending",
    },
  ]);

  const dailyTarget = 10; // The daily target of jobs
  const [progress, setProgress] = useState(0);

  // Update progress whenever the number of jobs changes
  useEffect(() => {
    setProgress((jobs.length / dailyTarget) * 100);
  }, [jobs]);

  const addJob = () => {
    // Add a new job to the list
    const newJob = {
      id: jobs.length + 1,
      company: `Company ${jobs.length + 1}`,
      designation: "New Role",
      applied_through: "LinkedIn",
      application_status: "Pending",
    };
    setJobs([...jobs, newJob]);
  };

  const deleteJob = (id) => {
    // Remove a job from the list
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div>
      <Typography variant="h4" textAlign="center" mb={4}>
        Job Application Tracker
      </Typography>

      <LinearProgressWithLabel value={progress} />

      <Box p={4}>
        <Typography variant="h5" mb={2} textAlign="center" fontWeight={600}>
          Important Dates
        </Typography>

        <Box>
          <table style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>Company</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Status</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Edit</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((item) => (
                <tr key={item.id}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{item.company}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{item.application_status}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    <RiEdit2Fill style={{ cursor: "pointer" }} />
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px", color: "red" }}>
                    <RiDeleteBin4Fill
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteJob(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        <Box
          marginTop="10px"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "black", width: "200px" }}
            onClick={addJob}
          >
            Add New Job
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Jobs;
