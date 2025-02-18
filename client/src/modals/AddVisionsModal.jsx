import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { data } from "react-router-dom";

function AddVisionsModal({ userId, show, setShow,refresh }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const handleClose = () => {
    setShow(!show);
  };
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET_NAME;


    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data?.secure_url) {
      const res = await axios.post("/profile/addvision", {
        secure_url: data.secure_url,
        url: data.url,
        title: title,
        userId,
      });
    }
    setShow(!show);
    refresh=!refresh
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
        marginLeft="200px"
        width="400px"
      >
        <Typography variant="h6" mb={2}>
          ADD VISION
        </Typography>
        <form>
          <Grid container spacing={2}>
            {/* Row 1: Vision Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vision Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>

            {/* Row 2: Image Upload */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                style={{ width: "100%" }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              type="button"
              onClick={handleUpload}
              style={{
                backgroundColor: "black",
                color: "white",
                width: "150px",
              }}
            >
              Save
            </Button>
            <Button variant="outlined" color="black" style={{ width: "150px" }}>
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default AddVisionsModal;
