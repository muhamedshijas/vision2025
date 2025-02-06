import { Box } from "@mui/material";
import React, { useState } from "react";
import Jobs from "./Jobs";
import AnnualTaskSideBar from "./AnnualTaskSideBar";
function AnnualTaskHome() {
  // State to track the active section
  const [activeSection, setActiveSection] = useState("Feedback");

  // Section content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "Relgious":
        return <div>Relgious Section</div>;
      case "Daily Routine":
        return <div>Relgious Section</div>;
      case "Jobs":
        return <Jobs />;
      case "Feedback":
        return <div>Relgious Section</div>;
      case "Daily Report":
        return <div>Daily Report</div>;
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
        <AnnualTaskSideBar
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

export default AnnualTaskHome;
