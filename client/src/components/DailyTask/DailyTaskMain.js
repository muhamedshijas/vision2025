import { Box } from "@mui/material";
import React, { useState } from "react";
import DailyTaskSideBar from "./DailyTaskSidebar";
import Jobs from "./Jobs";
import DailyQuotes from "./DailyQuotes";
function DailyTaskMain() {
  // State to track the active section
  const [activeSection, setActiveSection] = useState("Personal");

  // Section content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "Relgious":
        return <div>Relgious Section</div>;
      case "Entertainment":
        return <div>Entertainment</div>;
      case "Jobs":
        return <Jobs />;
      case "Daily Quotes":
        return <DailyQuotes/>
      case "Daily Report":
        return <div>Daily Report</div>;
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
        <DailyTaskSideBar
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

export default DailyTaskMain;
