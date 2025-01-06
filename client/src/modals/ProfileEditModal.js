import React, { useState } from "react";
import { Box, Button, Typography, TextField, Grid } from "@mui/material";
import axios from "axios";

function ProfileEditModal({ showModal, setShowModal, userId }) {

  const [houseName, setHouseName] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [post, setPost] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const handleClose = () => {
    setShowModal(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post("/profile/edit", {
      houseName,
      place,
      post,
      district,
      pincode,
      date,
      bloodGroup,
      userId,
    });
    if (response.error) {
      console.log("Error occurred during submission");
    } else {
      console.log("Profile updated successfully");
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Row 1: Address and Date */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="House Name"
                  value={houseName}
                  onChange={(e) => setHouseName(e.target.value)}
                  required
                />
              </Grid>

              {/* Row 2: Place and Post */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Post"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  required
                />
              </Grid>

              {/* Row 3: District and State */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </Grid>

              {/* Row 4: Pincode and Blood Group */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Blood Group"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
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
