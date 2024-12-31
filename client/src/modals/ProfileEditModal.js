import React, { useState } from "react";
import { Box, Button, Typography, TextField, Grid } from "@mui/material";
import axios from "axios";
function ProfileEditModal({ showModal, setShowModal }) {
  const [formData, setFormData] = useState({
    houseName: "",
    date: "",
    place: "",
    post: "",
    district: "",
    state: "",
    pincode: "",
    blood_Group: "",
  });

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    const response = await axios.post("/profile/edit", { formData });
    if (response.error) {
      console.log();
    } else {
      console.log("Successss");
      handleClose();
    }
  }

  return (
    showModal && (
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
          width="600px"
        >
          <Typography variant="h6" mb={2}>
            Add/Edit Profile
          </Typography>
          <form onSubmit={handleSubmit} style={{ zIndex: 1300 }}>
            <Grid container spacing={2}>
              {/* Row 1: Address and Date */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="House Name"
                  name="houseName"
                  value={formData.houseName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Row 2: Place and Post */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Place"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Post"
                  name="post"
                  value={formData.post}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Row 3: District and State */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Row 4: Pincode and Blood Group */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Blood Group"
                  name="blood_Group"
                  value={formData.blood_Group}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "black", color: "white" }}
              >
                Save
              </Button>
              <Button variant="outlined" color="black" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    )
  );
}

export default ProfileEditModal;
