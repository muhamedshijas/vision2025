import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";
import { RiFileCopyFill } from "react-icons/ri";
function Dates() {
  const [dates, setDates] = useState([
    { id: 1, date: "28/07/2001", description: "Birthday" },
    { id: 2, date: "28/07/2001", description: "Birthday" },
    { id: 3, date: "28/07/2001", description: "Birthday" },
    { id: 4, date: "28/07/2001", description: "Birthday" },
    { id: 5, date: "28/07/2001", description: "Birthday" },
    { id: 6, date: "28/07/2001", description: "Birthday" },
    { id: 7, date: "28/07/2001", description: "Birthday" },
    { id: 8, date: "28/07/2001", description: "Birthday" },
    { id: 9, date: "28/07/2001", description: "Birthday" },
    { id: 10, date: "28/07/2001", description: "Birthday" },
    { id: 11, date: "28/07/2001", description: "Birthday" },
  ]);

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2} textAlign="center" fontWeight={600}>
        Important Dates
      </Typography>

      <Box>
        <table style={{ textAlign: "center" }}>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th colSpan={2}>Action</th>
          </tr>
          {dates.map((item) => (
            <tr>
              <td>
                <div
                  className=""
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
                {" "}
                <div
                  className=""
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    fontSize: "14px",
                  }}
                >
                  {item.description}
                </div>
              </td>
              <td>
                {" "}
                <div
                  className=""
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    borderRadius: "0px 0px 0px 0px",
                    fontSize: "14px",
                  }}
                >
                  <RiEdit2Fill />
                </div>
              </td>
              <td>
                {" "}
                <div
                  className=""
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    borderRadius: "0px 5px 5px 0px",
                    fontSize: "14px",
                    color: "Red",
                  }}
                >
                  <RiDeleteBin4Fill />
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
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "black", width: "200px" }}
        >
          Add new
        </Button>
      </Box>
    </Box>
  );
}

export default Dates;
