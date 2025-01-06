import { Box, Typography, Button, Pagination } from "@mui/material";
import React, { useState } from "react";
import TemplateModals from "../../modals/TemplateModals";
import AddJobModal from "../../modals/AddJobModal";

function Jobs() {
  const [templateModalShow, setTemplateModalShow] = useState(false);
  const [jobAddModal, setJobAddModal] = useState(false);

  const handleTemplateModal = () => {
    setTemplateModalShow(!templateModalShow);
  };
  const handleAddModal = () => {
    setJobAddModal(!jobAddModal);
  };
  const jobs = [
    {
      jobPosition: "FullStack Developer",
      company: "Pulse63",
      location: "Remote",
      timePeriod: "2023 Sep to 2024 Sep",
      package: "4.2 LPA",
      projects: ["Tealth", "Hoops", "HoopsAPI", "Petto"],
    },
    {
      jobPosition: "FullStack Developer",
      company: "Pulse63",
      location: "Remote",
      timePeriod: "2023 Sep to 2024 Sep",
      package: "4.2 LPA",
      projects: ["Tealth", "Hoops", "HoopsAPI", "Petto"],
    },
    {
      jobPosition: "FullStack Developer",
      company: "Pulse63",
      location: "Remote",
      timePeriod: "2023 Sep to 2024 Sep",
      package: "4.2 LPA",
      projects: ["Tealth", "Hoops", "HoopsAPI", "Petto"],
    },
    {
      jobPosition: "FullStack Developer",
      company: "Pulse63",
      location: "Remote",
      timePeriod: "2023 Sep to 2024 Sep",
      package: "4.2 LPA",
      projects: ["Tealth", "Hoops", "HoopsAPI", "Petto"],
    },
    {
      jobPosition: "Backend Developer",
      company: "TechCorp",
      location: "On-site",
      timePeriod: "2022 Jan to 2023 Aug",
      package: "6 LPA",
      projects: ["FinTech", "DataSync", "ReportsAPI", "LogsSystem"],
    },
    {
      jobPosition: "Frontend Developer",
      company: "WebDesignPro",
      location: "Hybrid",
      timePeriod: "2021 May to 2022 Dec",
      package: "5 LPA",
      projects: ["UIBuilder", "StyleGuide", "AnimationLib", "PortfolioSite"],
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get jobs for the current page
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentJobs.map((job, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          margin="16px auto"
          width="90%"
          padding="16px"
          border="1px solid #ddd"
          borderRadius="8px"
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        >
          {/* Left Section: Job Details */}
          <Box display="flex" flexDirection="column" flex="1">
            <Typography variant="h6" fontWeight="bold">
              {job.jobPosition}
            </Typography>
            <Typography variant="body1">{job.company}</Typography>
            <Typography variant="body2" color="text.secondary">
              {job.package}
            </Typography>
          </Box>

          {/* Center Section: Projects */}
          <Box
            display="flex"
            justifyContent="center"
            gap="8px"
            flex="2"
            flexWrap="wrap"
          >
            {job.projects.map((project, idx) => (
              <Button
                key={idx}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
              >
                {project}
              </Button>
            ))}
          </Box>

          {/* Right Section: Location and Time Period */}
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body2">{job.location}</Typography>
            <Typography variant="body2" color="text.secondary">
              {job.timePeriod}
            </Typography>
            <Typography
              variant="body2"
              color="red"
              style={{ cursor: "pointer" }}
            >
              remove
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Pagination Section */}
      <Box display="flex" justifyContent="center" marginTop="16px">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="black"
        />
      </Box>
      <Box width="100%" display="flex" justifyContent="space-around">
        <Button
          variant="contained"
          style={{ backgroundColor: "#759EB8", color: "white" }}
          onClick={handleTemplateModal}
        >
          Download Templates
        </Button>
        <Button
          style={{ border: "1px solid #759EB8", color: "#759EB8" }}
          onClick={handleAddModal}
        >
          Add New Job
        </Button>
      </Box>
      {templateModalShow && (
        <TemplateModals
          templateShow={templateModalShow}
          setTemplateShow={setTemplateModalShow}
        />
      )}
      {jobAddModal && (
        <AddJobModal
          jobAddModal={jobAddModal}
          setJobAddModal={setJobAddModal}
        />
      )}
    </div>
  );
}

export default Jobs;
