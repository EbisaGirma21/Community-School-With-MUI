import React from "react";
import Header from "../../components/UI/Header";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MyAccount from "./MyAccount";

export const StudentInfo = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="flex flex-col min-h-screen items-center gap-52 relative overflow-x-hidden 2xl:pl-72 2xl:pr-72 xl:pl-48 xl:pr-48 lg:pl-24 lg:pr-24 pl-10 pr-10 ease-in-out duration-300">
      <Header isLogin={true} />
      <Box className="flex justify-between min-h-screen mt-16">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="My Account" value="1" />
                <Tab label="Docs Detail" value="2" />
                <Tab label="Change password" value="3" />
                <Tab label="Setting" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <MyAccount />
            </TabPanel>
            <TabPanel value="2">Docs Detail</TabPanel>
            <TabPanel value="3">Change password</TabPanel>
            <TabPanel value="4">Setting</TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};
