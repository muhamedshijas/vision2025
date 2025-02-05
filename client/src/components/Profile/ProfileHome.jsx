import { Box } from "@mui/material";
import React, { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import Personal from "./Personal";
import Passwords from "./Passwords";
import Dates from "./Dates";
import Jobs from "./Jobs";
import VisionBoard from "./VisionBoard";

function ProfileHome() {
  // State to track the active section
  const [activeSection, setActiveSection] = useState("Personal");

  // Section content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "Personal":
        return <Personal />;
      case "Passwords":
        return <Passwords />;
      case "Jobs":
        return <Jobs/>
      case "Dates":
        return <Dates/>
      case "Vision Board":
        return <VisionBoard/>;
      default:
        return <div>Select a section to view content</div>;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        width="80%"
        bgcolor="white"
        height="95%"
        borderRadius="8px"
        display="flex"
      >
        {/* Sidebar */}
        <ProfileSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Content Area */}
        <Box flex="1" padding="20px">
          {renderContent()}
        </Box>
      </Box>
    </div>
  );
}

export default ProfileHome;
