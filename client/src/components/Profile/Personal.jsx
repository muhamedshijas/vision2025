import React, { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import { Box, Button } from "@mui/material";
import "./styles/personal.css";
import ProfileEditModal from "../../modals/ProfileEditModal";
function Personal() {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(true);
  };
  return (
    <div>
      <Box>
        <table>
          <tr>
            <th>Name</th>
            <th>House Name</th>
          </tr>
          <tr>
            <td>Muhamed Shijas</td>
            <td>Moorkath</td>
          </tr>
          <tr>
            <th>Place</th>
            <th>Post </th>
            <th>Pin</th>
          </tr>
          <tr>
            <td>Jarahtingal</td>
            <td>Kadampuzha</td>
            <td>676553</td>
          </tr>
          <tr>
            <th>District</th>
            <th>State</th>
          </tr>
          <tr>
            <td>Malappuram</td>
            <td>Kerala</td>
          </tr>
          <tr>
            <th>Age</th>
            <th>DOB</th>
            <th>Blood Group</th>
          </tr>
          <tr>
            <td>23</td>
            <td>28-07-2001</td>
            <td>B+ve</td>
          </tr>
          <tr>
            <th>Mobile No</th>
            <th>Email</th>
          </tr>
          <tr>
            <td>8086665118</td>
            <td>shijushijas157@gmail.com</td>
          </tr>
        </table>

        <Button
          variant="contained"
          sx={{ marginTop: "20px", bgcolor: "black" }}
          onClick={handleModal}
        >
          Edit or ADD
        </Button>
        {showModal && (
          <ProfileEditModal showModal={showModal} setShowModal={setShowModal} />
        )}
      </Box>
    </div>
  );
}

export default Personal;
