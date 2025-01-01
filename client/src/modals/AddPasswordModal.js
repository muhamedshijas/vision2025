import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function AddPasswordModal({ show, setShow, userId }) {
  const handleClose = () => {
    setShow(false);
  };
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(password, account);
    const result = await axios.post("/profile/addpassword", {
      userId,
      account,
      password,
    });
    if (!result.err) {
      handleClose();
    }
  }
  return (
    <div>
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
            ADD PASSWORD
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Row 1: Address and Date */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Name"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  required
                />
              </Grid>

              {/* Row 2: Place and Post */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
                onClick={handleClose}
                style={{ width: "150px" }}
              >
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default AddPasswordModal;
