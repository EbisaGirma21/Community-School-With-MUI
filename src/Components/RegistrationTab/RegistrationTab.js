import "./RegistrationTab.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Datatable from "../UI/Datatable/Datatable";
import { useState } from "react";
import Modal from "../UI/Modal/Modal";
import Dropdown from "../Dropdown/Dropdown";
import { Button, Grid } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
export default function RegisrationTab() {
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
            <Tab label="Enrollment" value="1" />
            <Tab label="Deregistration" value="2" />
            <Tab label="New Students" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="enrollment-tab">
            <div className="enrollment-top__items">
              <Grid container spacing={4} className="enrollment-top__grid">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Button variant="contained">
                    <DoneIcon /> Display Elligible Students
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <Dropdown />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  {" "}
                  <Button variant="contained">
                    <AddIcon />
                    Enrol Elligible Students
                  </Button>
                </Grid>
              </Grid>
            </div>
            <hr />
            <p className="table-title">List of Eligible students</p>
            <hr />
            <div className="enrollment-table">
              <Datatable />
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="regisration-subject">
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
          <div className="regisration-table">
            <Datatable />
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
