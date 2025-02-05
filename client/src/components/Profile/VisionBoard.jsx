import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import AddVisionsModal from "../../modals/AddVisionsModal";

function VisionBoard() {
  const [tabIndex, setTabIndex] = useState(0);
  const [show, setShow] = useState(false);
  const visions = [
    { title: "Umrah With Fam", isCompleted: false, img: "" },
    { title: "Buy an iPhone", isCompleted: false, img: "" },
    { title: "Place on a company", isCompleted: true, img: "" },
    { title: "Travel to Dubai", isCompleted: true, img: "" },
    { title: "Start a Business", isCompleted: false, img: "" },
    { title: "Learn a new language", isCompleted: true, img: "" },
    { title: "Get a fitness goal", isCompleted: true, img: "" },
    { title: "Own a house", isCompleted: false, img: "" },
    { title: "Get Married", isCompleted: false, img: "" },
    {
      title: "Own  a car",
      isCompleted: true,
      img: "https://res.cloudinary.com/dv5bvojzi/image/upload/v1738766957/lkcnqk3cyu5k0jb4o2kt.jpg",
    },
  ];

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
                {vision ? (
                  <Typography>{vision.title}</Typography>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleModal}
                  >
                    Update
                  </Button>
                )}
                {show && <AddVisionsModal />}
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
                <img src={vision.img} />
                <Typography>{vision.title}</Typography>
              </Box>
            ))}
      </Box>
    </Box>
  );
}

export default VisionBoard;
