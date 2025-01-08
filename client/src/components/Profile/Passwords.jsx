import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, Pagination } from "@mui/material";
import { RiDeleteBin4Fill, RiFileCopyFill } from "react-icons/ri";
import AddPasswordModal from "../../modals/AddPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Passwords() {
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const passwordsPerPage = 10; // Number of passwords per page

  const user = useSelector((state) => {
    return state.user.detials;
  });

  const userId = user._id;

  // Fetch passwords
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get(`/profile/getpasswords/${userId}`);
        setPasswords(response.data);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    if (userId) {
      fetchPasswords();
    }
  }, [userId, refresh]);

  // Handle modal visibility
  const handleModal = () => {
    setShow(true);
  };

  // Handle copying password
  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
    alert(`Password copied to clipboard!`);
  };

  // Handle deleting password
  const handleDelete = async (account) => {
    try {
      const response = await axios.delete(`/profile/deletepassword/${userId}`, {
        data: { account },
      });

      setRefresh((prev) => !prev); // Refresh passwords after deletion
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(passwords.length / passwordsPerPage);
  const startIndex = (currentPage - 1) * passwordsPerPage;
  const currentPasswords = passwords.slice(startIndex, startIndex + passwordsPerPage);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2} textAlign="center" fontWeight={600}>
        Password Manager
      </Typography>

      <Box>
        <table style={{ textAlign: "center", width: "100%" }}>
          <thead>
            <tr>
              <th>Account/User Name</th>
              <th>Password</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPasswords.map((item, index) => (
              <tr key={index}>
                <td>
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      borderRadius: "5px 0px 0px 5px",
                      fontSize: "14px",
                    }}
                  >
                    {item.account}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  >
                    ••••••••••••
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <RiFileCopyFill onClick={() => handleCopy(item.password)} />
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      borderRadius: "0px 5px 5px 0px",
                      fontSize: "14px",
                      color: "red",
                    }}
                  >
                    <RiDeleteBin4Fill onClick={() => handleDelete(item.account)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* Pagination Section */}
      <Box display="flex" justifyContent="center" marginTop="16px">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* Add new password button */}
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
          <AddPasswordModal show={show} setShow={setShow} userId={userId} />
        )}
      </Box>
    </Box>
  );
}

export default Passwords;
