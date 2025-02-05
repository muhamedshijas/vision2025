import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  RiDeleteBin4Fill,
  RiEdit2Fill,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { Button, MenuItem, Select } from "@mui/material";
import AddJobs from "../../modals/DailyTask/AddJobs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UpdateStatusModal from "../../modals/DailyTask/UpdateStatusModal";



function MonthlyJobs() {
  const user = useSelector((state) => state.user.detials);
  const userId = user._id;
  const date = new Date();

  const [jobs, setJobs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const refresh = useSelector((state) => state.refresh);
  const [month, setMonth] = useState("Jan");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`monthly-task/get-jobs`,{params: { userId, month }});
        const sortedJobs = response.data.sort((a, b) => {
          const priority = {
            Indeed: 1,
            Naukri: 2,
            Email: 3,
          };
          return (
            (priority[a.appliedThrough] || 4) -
            (priority[b.appliedThrough] || 4)
          );
        });
        setJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (userId) {
      fetchJobs();
    }
  }, [userId, refresh,month]);

  const dailyTarget = 10; // The daily target of jobs

  const handleEditModal = (job) => {
    setSelectedJob(job);
    setShowEditModal(true);
  };

  // Update progress whenever the number of jobs changes
  useEffect(() => {
    setProgress((jobs.length / dailyTarget) * 100);
  }, [jobs]);
  const dispatch = useDispatch();
  const noUpdation = jobs.length == 0;
  async function handleDelete(jobId) {
    const result = await axios.delete(`/daily-task/delete-job/${userId}`, {
      data: { jobId, date },
    });
    dispatch({ type: "refresh" });
  }
  const currentMonthIndex = new Date().getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Limit selection to past & current months
  const availableMonths = months.slice(0, currentMonthIndex + 1);
  const filteredJobs = jobs.filter((job) => {
    const jobMonth = new Date(job.date).getMonth();
    return months[jobMonth] === month;
  });

  // Update progress when jobs change
  useEffect(() => {
    setProgress((filteredJobs.length / 10) * 100);
  }, [filteredJobs]);
  return (
    <div>
      <Box>
        <Typography variant="h4" textAlign="center" mb={4}>
          Job Application Tracker
        </Typography>
        <Select
          fullWidth
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a Month
          </MenuItem>
          {months.map((m, index) => (
            <MenuItem key={m} value={m} disabled={index > currentMonthIndex}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box width="100%">
        <Box display="flex" justifyContent="center" alignItems="center ">
          <table style={{ textAlign: "center", width: "100%" }}>
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
                      ? "white"
                      : item.status === "Rejected"
                      ? "red"
                      : item.status === "Call Backed"
                      ? "yellow"
                      : "white", // Fallback color
                  color: item.status === "Rejected" ? "white" : "",
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
                  <div
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
                  <div
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
                  <div
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
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {item.status}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <RiEdit2Fill onClick={() => handleEditModal(item)} />
                  </div>
                </td>
                <td style={{ borderRadius: "0px 5px 5px 0px" }}>
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      borderRadius: "0px 5px 5px 0px",
                      fontSize: "14px",
                      color: item.status === "Rejected" ? "white" : "red",
                    }}
                  >
                    <RiDeleteBin4Fill onClick={() => handleDelete(item._id)} />
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
        ></Box>
        {showEditModal && (
          <UpdateStatusModal
            job={selectedJob}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            userId={userId}
          />
        )}
      </Box>
    </div>
  );
}

export default MonthlyJobs;
