import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  RiDeleteBin4Fill,
  RiEdit2Fill,
  RiCheckboxCircleFill,
  RiArrowLeftDoubleFill,
  RiArrowRightDoubleLine,
} from "react-icons/ri";
import { Button, MenuItem, Pagination, Select, TextField } from "@mui/material";
import AddJobs from "../../modals/DailyTask/AddJobs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UpdateStatusModal from "../../modals/DailyTask/UpdateStatusModal";
import { getApplicationStats } from "../../utilities/JobCount";

function Jobs() {
  const user = useSelector((state) => state.user.detials);
  const userId = user._id;
  const date = new Date();

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [progress, setProgress] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;
  const refresh = useSelector((state) => state.refresh);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`annual-task/get-jobs/${userId}`, {});
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (userId) {
      fetchJobs();
    }
  }, [userId, refresh]);

  const handleEditModal = (job) => {
    setSelectedJob(job);
    setShowEditModal(true);
  };
  const jobCount = getApplicationStats(jobs);
  console.log(jobCount);

  const dispatch = useDispatch();
  async function handleDelete(jobId) {
    const result = await axios.delete(`/daily-task/delete-job/${userId}`, {
      data: { jobId, date },
    });
    dispatch({ type: "refresh" });
  }
  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );
  const statusColors = {
    "Call Backed": "yellow",
    "Pending": "gray",
    "Rejected": "red",
    "Tech Interview Done": "#81E4DA",
    "Total": "black" // Default color
  };

  return (
    <div>
      <Typography variant="h4" textAlign="center" mb={4}>
        Job Applications
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          sx={{
            width: "48%",
            height: "50px",
          }}
          label="Search by Company or Designation"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box width="100%">
      <Typography display="flex" flexWrap="wrap" gap="10px" mt={1}>
      {Object.entries(jobCount).map(([key, value]) => (
        <div
          key={key}
          style={{
            backgroundColor: statusColors[key] || "black", // Default to black if not in list
            color: key === "Call Backed" ? "black" : "white", // Adjust text color for visibility
            padding: "4px 8px",
            borderRadius: "4px"
          }}
        >
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </Typography>
        <Box display="flex" justifyContent="center" alignItems="center ">
          <table style={{ textAlign: "center", width: "100%" }}>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Designation</th>
              <th>Place</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
            {displayedJobs.map((item, index) => (
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
                      : item.status == "Tech Interview Done"
                      ? "#81E4DA"
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
                    {item.date}
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

        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </Box>
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

export default Jobs;
