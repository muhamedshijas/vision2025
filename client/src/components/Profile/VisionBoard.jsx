import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import AddVisionsModal from "../../modals/AddVisionsModal";
import { RiDeleteBinFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import axios from "axios";

function VisionBoard() {
  const user = useSelector((state) => {
    return state.user.detials;
  });
  const userId = user._id;

  const [tabIndex, setTabIndex] = useState(0);
  const [show, setShow] = useState(false);
  const { refresh, setRefresh } = useSelector((state) => state.refresh);
  const [visions, setVisions] = useState([]);
  useEffect(() => {
    const fetchVisions = async () => {
      try {
        const response = await axios.get(`/profile/getvisions/${userId}`);
        setVisions(response.data);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    if (userId) {
      fetchVisions();
    }
  }, [userId, refresh]);
  // Filter visions
  const completedVisions = visions.filter((v) => v.isCompleted);
  const notCompletedVisions = visions.filter((v) => !v.isCompleted);

  // Ensure 8 boxes per tab
  const displayedNotCompleted = [
    ...notCompletedVisions,
    ...Array(8 - notCompletedVisions.length).fill(null),
  ];

  const handleModal = () => {
    setShow(!show);
  };
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const handleToggle = async (title, isCompleted) => {
    const response = await axios.put("/profile/updatevision", {
      title,
      isCompleted,
      userId,
    });
    setRefresh(!refresh);
  };
  const handleDelete = async (title) => {
    const response = await axios.delete("/profile/deletevision", {
      params: { title, userId },
    });
    setRefresh(!refresh);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} textAlign="center">
        VISION BOARD
      </Typography>

      {/* Tabs Navigation */}
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        centered
        sx={{ marginTop: "10px" }}
      >
        <Tab label="Not Completed" />
        <Tab label="Completed" />
      </Tabs>

      {/* Tab Content */}
      <Box
        mt={2}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
      >
        {tabIndex === 0
          ? displayedNotCompleted.map((vision, index) => (
              <Box
                key={index}
                width="180px"
                height="200px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
                borderRadius="10px"
                textAlign="center"
                padding="10px"
              >
                {vision ? (
                  <Box>
                    <img
                      src={vision.secure_url ? vision.secure_url : vision.url}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "5px",
                      }}
                    />
                    <Typography sx={{ fontWeight: 700 }}>
                      {vision.title.toUpperCase()}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <FormControlLabel
                        control={
                          <Switch
                            sx={{
                              transform: "scale(0.7)", // Reduces the size of the switch
                            }}
                            checked={vision.isCompleted}
                            onChange={() =>
                              handleToggle(vision.title, vision.isCompleted)
                            }
                          />
                        }
                        label={
                          <Typography
                            sx={{ fontSize: "12px", fontWeight: 600 }}
                          >
                            {" "}
                            {/* Reduce label font size */}
                            {vision.isCompleted ? "COMPLETED" : "NOT COMPLETED"}
                          </Typography>
                        }
                      />
                    </Box>
                    <RiDeleteBinFill
                      color="RED"
                      fontSize="14px"
                      onClick={() => handleDelete(vision.title)}
                    />
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleModal}
                  >
                    Update
                  </Button>
                )}
                {show && (
                  <AddVisionsModal
                    show={show}
                    userId={userId}
                    setShow={setShow}
                    refresh={refresh}
                  />
                )}
              </Box>
            ))
          : completedVisions.map((vision, index) => (
              <Box
                key={index}
                width="200px"
                height="200px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
                borderRadius="10px"
                textAlign="center"
                padding="10px"
              >
                <img
                  src={vision.secure_url ? vision.secure_url : vision.url}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "5px",
                  }}
                />
                <Typography>{vision.title}</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={vision.isCompleted}
                      onChange={() =>
                        handleToggle(vision.title, vision.isCompleted)
                      }
                    />
                  }
                  label={vision.isCompleted ? "completed" : "not completed"}
                />
              </Box>
            ))}
      </Box>
    </Box>
  );
}

export default VisionBoard;
