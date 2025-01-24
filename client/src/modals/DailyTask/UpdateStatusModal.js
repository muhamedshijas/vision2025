import React, { useState } from "react";
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
import { useDispatch } from "react-redux";

function UpdateStatusModal({ job, showEditModal, setShowEditModal, userId }) {
  const [updatedStatus, setUpdatedStatus] = useState(job.status);
 const dispatch=useDispatch()
  const handleClose = () => {
    setShowEditModal(false);
  };

  const handleStatusChange = (event) => {
    setUpdatedStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(job._id);
      const {data} = await axios.put(`/daily-task/update-status/${userId}`, {
        status: updatedStatus,
        jobId: job._id,
      });
      
      
      if (data.status == true) {
        dispatch({ type: "refresh" });
        handleClose();
      } else { 
        alert("some error occured");
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      alert("Failed to update status.");
    }
  };

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
        width="400px"
      >
        <Typography variant="h6" mb={2}>
          Update Status
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company"
                required
                value={job.company}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                value={updatedStatus}
                onChange={handleStatusChange}
                required
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Call Backed">Call Backed</MenuItem>
                <MenuItem value="First Interview Done">
                  First Interview Done
                </MenuItem>
                <MenuItem value="Tech Interview Done">
                  Tech Interview Done
                </MenuItem>
                <MenuItem value="Placed">Placed</MenuItem>
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
  );
}

export default UpdateStatusModal;
