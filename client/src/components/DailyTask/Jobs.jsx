import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";
import { Button } from "@mui/material";
import AddJobs from "../../modals/DailyTask/AddJobs";
import { useSelector } from "react-redux";
import axios from "axios";

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
  const user = useSelector((state) => {
    return state.user.detials;
  });
  const userId = user._id;
  const [jobs, setJobs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axios.get(`daily-task/get-jobs/${userId}`);
        setJobs(response.data);
        console.log(jobs);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    if (userId) {
      fetchDates();
    }
  }, [userId, refresh]);

  const dailyTarget = 10; // The daily target of jobs
  const [progress, setProgress] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleModal = () => {
    setShowAddModal(!showAddModal);
  };
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
      <Box width="100%">
        <Box display="flex" justifyContent="center" alignItems="center ">
          <table style={{ textAlign: "center" }}>
            <tr>
              <th>Company</th>
              <th>Designation</th>
              <th>Place</th>
              <th>Applied Through</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
            {jobs.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderRadius: "10px",
                  backgroundColor:
                    item.status === "Pending"
                      ? "white" // Default color
                      : item.status === "Rejected"
                      ? "red"
                      : item.status === "Call Backed"
                      ? "yellow"
                      : "white", // Fallback color
                }}
              >
                <td style={{ borderRadius: "5px 0px 0px 5px" }}>
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      borderRadius: "5px 0px 0px 5px",
                      fontSize: "14px",
                    }}
                  >
                    {item.company}
                  </div>
                </td>
                <td>
                  {" "}
                  <div
                    className=""
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {item.designation}
                  </div>
                </td>
                <td>
                  {" "}
                  <div
                    className=""
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {item.place}
                  </div>
                </td>
                <td>
                  {" "}
                  <div
                    className=""
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {item.email ? item.email : item.appliedThrough}
                  </div>
                </td>
                <td>
                  {" "}
                  <div
                    className=""
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "14px",
                      color: {},
                    }}
                  >
                    {item.status}
                  </div>
                </td>
                <td>
                  {" "}
                  <div
                    className=""
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      borderRadius: "0px 0px 0px 0px",
                      fontSize: "14px",
                    }}
                  >
                    <RiEdit2Fill />
                  </div>
                </td>
                <td style={{ borderRadius: "0px 5px 5px 0px" }}>
                  {" "}
                  <div
                    className=""
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      borderRadius: "0px 5px 5px 0px",
                      fontSize: "14px",
                      color: "Red",
                    }}
                  >
                    <RiDeleteBin4Fill />
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </Box>
        <Box
          marginTop="10px"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {jobs.length < dailyTarget && (
            <Button
              variant="contained"
              style={{ backgroundColor: "black", width: "200px" }}
              onClick={handleModal}
            >
              Add New Job
            </Button>
          )}
        </Box>
        {showAddModal && (
          <AddJobs
            setShowAddModal={setShowAddModal}
            showAddModal={showAddModal}
            userId={userId}
          />
        )}
      </Box>
    </div>
  );
}

export default Jobs;
