import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";
import { RiFileCopyFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import AddDatesModal from "../../modals/AddDatesModal";
import axios from "axios";
function Dates() {
  const [show, setShow] = useState(false);
  const [dates,setDates]=useState([])
  const [refresh,setRefresh]=useState(false)
  const user = useSelector((state) => {
    return state.user.detials;
  });

  const userId = user._id;

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get(`/profile/getdates/${userId}`);
        setDates(response.data);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    if (userId) {
      fetchPasswords();
    }
  }, [userId, refresh]);
  const handleModal = () => {
    setShow(true);
  };
  const handleDelete = async (description) => {
    try {
      const response = await axios.delete(`/profile/deletedate/${userId}`, {
        data: { description },
      });
  
      // Refresh the dates list
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error deleting date:', error);
    }
  };

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
                  {item.dates}
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
                  <RiDeleteBin4Fill onClick={() => handleDelete(item.description)}  />
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
          onClick={handleModal}
        >
          Add new
        </Button>
        {show && (
          <AddDatesModal show={show} setShow={setShow} userId={userId} />
        )}
      </Box>
    </Box>
  );
}

export default Dates;
