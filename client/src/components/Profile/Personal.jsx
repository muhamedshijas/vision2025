import React, { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import { Box, Button } from "@mui/material";
import "./styles/personal.css";
import ProfileEditModal from "../../modals/ProfileEditModal";
import { useSelector } from "react-redux";
function Personal() {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => {
    return state.user.detials
  })
  const id=user._id
  const {personal}=user
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if current month/day is before the birth month/day
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
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
            <td>{user.name}</td>
            <td>{personal.houseName}</td>
          </tr>
          <tr>
            <th>Place</th>
            <th>Post </th>
            <th>Pin</th>
          </tr>
          <tr>
            <td>{personal.place}</td>
            <td>{personal.post}</td>
            <td>{personal.pincode}</td>
          </tr>
          <tr>
            <th>District</th>
            <th>State</th>
          </tr>
          <tr>
            <td>{personal.district}</td>
            <td>{personal.state}</td>
          </tr>
          <tr>
            <th>Age</th>
            <th>DOB</th>
            <th>Blood Group</th>
          </tr>
          <tr>
            <td>{calculateAge(personal?.date)}</td>
            <td>{personal.date}</td>
            <td>{personal.bloodGroup}</td>
          </tr>
          <tr>
            <th>Mobile No</th>
            <th>Email</th>
          </tr>
          <tr>
            <td>{user.phoneNumber}</td>
            <td>{user.email}</td>
          </tr>
        </table>

        <Button
          variant="contained"
          sx={{ marginTop: "20px", bgcolor: "black"}}
          onClick={handleModal}
        >
          Edit or ADD
        </Button>
        {showModal && (
          <ProfileEditModal showModal={showModal} setShowModal={setShowModal} userId={id}/>
        )}
      </Box>
    </div>
  );
}

export default Personal;
