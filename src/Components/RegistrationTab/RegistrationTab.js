import "./RegistrationTab.scss";
import Tab from "../UI/Tab/Tab";
import Datatable from "../UI/Datatable/Datatable";
import Modal from "../UI/Modal/Modal";
import Dropdown from "../UI/Dropdown/Dropdown";
import { Button, Grid } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";

const curriculumTab = [
  {
    label: "Enrollment",
    value: "1",
    content: (
      <div className="enrollment-tab">
        <div className="enrollment-top__items">
          <Grid container spacing={4} className="enrollment-top__grid">
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Button variant="contained">
                <DoneIcon /> Display Elligible Students
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Dropdown />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
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
    ),
  },
  {
    label: "Deregistration",
    value: "2",
    content: (
      <>
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
      </>
    ),
  },
];

export default function RegisrationTab() {
  return <Tab tab_contents={curriculumTab} />;
}
