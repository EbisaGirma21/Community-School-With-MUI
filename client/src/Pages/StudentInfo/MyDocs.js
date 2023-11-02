import React, { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CurrentEnrollement from "./components/CurrentEnrollement";
import EnrollementHistory from "./components/EnrollementHistory";
import MyAssessment from "./components/MyAssessment";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const MyDocs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const currentPage = [
    "Current Enrollement",
    "Enrollement History",
    "My Assessment",
  ];
  return (
    <Box className="w-full mt-20">
      <Box
        sx={{ background: "#fff" }}
        className="w-full shadow-md p-4 rounded-lg flex justify-between items-center"
      >
        <Box className="text-xl font-medium">My Document</Box>
        <Box className="flex items-center justify-end gap-3 p-1">
          <HomeIcon sx={{ color: "#673AB7" }} className="cursor-pointer" />
          <NavigateNextIcon />
          <Typography>My Docs</Typography>
        </Box>
      </Box>
      <Box
        sx={{ background: "#fff" }}
        className=" shadow-md w-full rounded-lg mt-4"
      >
        <Box className="p-4 text-lg  font-medium">{currentPage[value - 1]}</Box>
        <Divider />
        <Box className="p-4">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="capitalize"
              >
                <Tab label="Current Enrollement" value="1" />
                <Tab label="Enrollement History" value="2" />
                <Tab label="My Assessment" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CurrentEnrollement />
            </TabPanel>
            <TabPanel value="2">
              <EnrollementHistory />
            </TabPanel>
            <TabPanel value="3">
              <MyAssessment />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default MyDocs;
