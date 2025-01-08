import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { RiFileCopyFill } from "react-icons/ri";
import AddPasswordModal from "../../modals/AddPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // You can use axios or fetch for API calls

function Passwords() {
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const user = useSelector((state) => {
    return state.user.detials;
  });

  const userId = user._id;

  // Fetch passwords when the component is mounted or when the userId changes
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

  const handleModal = () => {
    setShow(true);
  };

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
    alert(`Password copied to clipboard!`);
  };

  const handleDelete = async (account) => {
    try {
      const response = await axios.delete(`/profile/deletepassword/${userId}`, {
        data: { account },
      });

      // Refresh the passwords list
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting password:", error);
    }
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
              <th>Account</th>
              <th>Password</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((item) => (
              <tr key={item.id}>
                <td>
                  <div
                    className="password-item"
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
                    className="password-item"
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
                    className="password-item"
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
                    className="password-item"
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
