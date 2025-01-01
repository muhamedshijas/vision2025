import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { RiFileCopyFill } from "react-icons/ri";
import AddPasswordModal from "../../modals/AddPasswordModal";
import { useSelector } from "react-redux";

function Passwords() {
  const [passwords, setPasswords] = useState([
    { id: 1, account: "Instagram", password: "abcd1234" },
    { id: 2, account: "Facebook", password: "efgh5678" },
    { id: 4, account: "Twitter", password: "ijkl9012" },
    { id: 5, account: "Twitter", password: "ijkl9012" },
    { id: 6, account: "Twitter", password: "ijkl9012" },
    { id: 7, account: "Twitter", password: "ijkl9012" },
    { id: 8, account: "Twitter", password: "ijkl9012" },
    { id: 9, account: "Twitter", password: "ijkl9012" },
    { id: 10, account: "Twitter", password: "ijkl9012" },
    { id: 11, account: "Twitter", password: "ijkl9012" },
  ]);
  const user = useSelector((state) => {
    return state.user.detials;
  });
  const userId = user._id;
  const [show, setShow] = useState(false);
  const handleModal = () => {
    setShow(true);
  };
  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
    alert(`Password copied: ${password}`);
  };

  const handleDelete = (id) => {
    const updatedPasswords = passwords.filter((item) => item.id !== id);
    setPasswords(updatedPasswords);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2} textAlign="center" fontWeight={600}>
        Password Manager
      </Typography>

      <Box>
        <table style={{ textAlign: "center" }}>
          <tr>
            <th>Account</th>
            <th>Password</th>
            <th colSpan={2}>Action</th>
          </tr>
          {passwords.map((item) => (
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
                  {item.account}
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
                  {item.password}
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
                  <RiFileCopyFill />
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
                    color: "red",
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
