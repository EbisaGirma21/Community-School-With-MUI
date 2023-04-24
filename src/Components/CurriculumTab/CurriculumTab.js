import "./CurriculumTab.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Datatable from "../UI/Datatable/Datatable";
import { useState } from "react";
import Modal from "../UI/Modal/Modal";
import Dropdown from "../UI/Dropdown/Dropdown";
import { Grid } from "@mui/material";
export default function CurriculumTab() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="tab-top"
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Basic Info" value="1" />
            <Tab label="Subjects" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="curriculum-modal">
            <Modal />
          </div>
          <div className="curriculum-table">
            <Datatable />
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="curriculum-subject">
            <div className="dropdown">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Dropdown />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Dropdown />
                </Grid>
              </Grid>
            </div>
            <hr />
            <Modal />
          </div>
          <div className="curriculum-table">
            <Datatable />
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
