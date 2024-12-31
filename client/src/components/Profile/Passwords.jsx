import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";

function Passwords() {
  const [rows, setRows] = useState([
    { name: "Instagram", password: "************" },
    { name: "Instagram", password: "************" },
    { name: "Instagram", password: "************" },
  ]);

  const addRow = () => {
    setRows([...rows, { name: "", password: "" }]);
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2} textAlign="center">
        Password Manager
      </Typography>
      <Box
        component="table"
        sx={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "0 auto",
        }}
      >
        <Box component="thead">
          <Box component="tr">
            <Box
              component="th"
              sx={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              Name
            </Box>
            <Box
              component="th"
              sx={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              Password
            </Box>
            <Box
              component="th"
              sx={{
                textAlign: "center",
                padding: "8px",
                borderBottom: "1px solid #ccc",
              }}
            >
              Actions
            </Box>
          </Box>
        </Box>
        <Box component="tbody">
          {rows.map((row, index) => (
            <Box component="tr" key={index}>
              <Box
                component="td"
                sx={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  width: "30%",
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  value={row.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
              </Box>
              <Box
                component="td"
                sx={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  width: "30%",
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  value={row.password}
                  onChange={(e) =>
                    handleInputChange(index, "password", e.target.value)
                  }
                />
              </Box>
              <Box
                component="td"
                sx={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => alert("Copied!")}
                >
                copy
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => deleteRow(index)}
                >
                 delete
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box textAlign="center" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={addRow}
        >
          Add New
        </Button>
      </Box>
    </Box>
  );
}

export default Passwords;
