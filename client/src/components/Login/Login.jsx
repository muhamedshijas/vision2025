import React, { useState } from "react";
import login from "../../assets/images/login.jpg";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const result = await axios.post("/auth/login", {
      email,
      password,
    });
    console.log(result);
  }

  return (
    <div style={{ height: "100vh" }}>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          height="607px"
          width="1200px"
          bgcolor="#B3C5D7"
          borderRadius="10px"
          display="flex"
        >
          {/* Image Section */}
          <Box height="100%" width="50%" borderRadius="10px 0px 0px 10px">
            <img
              src={login}
              alt="login"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px 0px 0px 10px", // Match the border-radius for consistency
              }}
            />
          </Box>

          {/* Form Section */}
          <Box
            width="50%"
            padding="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h3"
              gutterBottom
              style={{
                fontWeight: "bold",
                textAlign: "left",
                color: "white",
                fontSize: "50px",
                width: "100%",
              }}
            >
              Welcome Back,
            </Typography>
            <Typography
              variant="h3"
              gutterBottom
              style={{
                fontWeight: "bold",
                textAlign: "left",
                color: "white",
                fontSize: "50px",
                width: "100%",
              }}
            >
              Please Login Here
            </Typography>

            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              <input
                type="text"
                placeholder="Enter your email here"
                style={{
                  height: "60px",
                  width: "590px",
                  border: "none",
                  outline: "none",
                  borderRadius: "4px",
                  paddingLeft: "10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password here"
                style={{
                  height: "60px",
                  width: "590px",
                  border: "none",
                  outline: "none",
                  borderRadius: "4px",
                  paddingLeft: "10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                variant="contained"
                style={{
                  height: "60px",
                  color: "white",
                  width: "600px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  backgroundColor: "#7392B7",
                  boxShadow: "none",
                }}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </form>
            <Typography marginTop="20px">
              Dont you have an account please{" "}
              <Link
                to="/signup"
                style={{ textDecoration: "none", fontWeight: "600" }}
              >
                {" "}
                signup here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Login;
