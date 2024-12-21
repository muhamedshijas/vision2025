import React from "react";
import signup from "../../assets/images/signup.jpg";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
function SignUp() {
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
             Hi Welcome,
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
                placeholder="Enter your name "
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
              />
              <input
                type="text"
                placeholder="Enter your email "
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
              />
              <input
                type="text"
                placeholder="Enter your mobile number  "
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
              />
              <input
                type="password"
                placeholder="Enter your password "
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
              >
                Login
              </Button>
            </form>
            <Typography marginTop="20px">
              Already have an account please{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", fontWeight: "600" }}
              >
                {" "}
                Login here
              </Link>
            </Typography>
          </Box>
          {/* Image Section */}
          <Box height="100%" width="50%" borderRadius="10px 0px 0px 10px">
            <img
              src={signup}
              alt="login"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0px 10px 10px 0px", // Match the border-radius for consistency
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default SignUp;
