import React from "react";

function AddDailyScore() {
  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      left="0px"
      top="0px"
      bgcolor="rgba(5, 5, 5, 0.141)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius="6px"
        boxShadow="0 0 10px rgba(0,0,0,0.3)"
        width="400px"
      >
        <Typography variant="h6" mb={2}>
          Add Skill Score
        </Typography>
      </Box>
    </Box>
  );
}

export default AddDailyScore;
