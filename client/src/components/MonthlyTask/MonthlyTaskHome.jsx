import { Box } from "@mui/material";
import React, { useState } from "react";
import MonthlyTaskSideBar from "./MonthlyTaskSideBar";
import MonthlyJobs from "./MonthlyJobs";
import MontlhlyGoals from "./MontlhlyGoals";
import MonthlyFeedbacks from "./MonthlyFeedbacks";
import MonthlyScores from "./MonthlyScores";
function MonthlyTaskHome() {
  // State to track the active section
  const [activeSection, setActiveSection] = useState("Feedback");

  // Section content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "Relgious":
        return <div>Relgious Section</div>;
      case "Daily Scores":
        return <MonthlyScores />;
      case "Jobs":
        return <MonthlyJobs />;
      case "Feedback":
        return <MonthlyFeedbacks />;
      case "Monthy Goals":
        return <MontlhlyGoals />;
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
        <MonthlyTaskSideBar
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

export default MonthlyTaskHome;
