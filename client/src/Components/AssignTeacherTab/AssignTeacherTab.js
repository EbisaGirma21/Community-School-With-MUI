import "./AssignTeacherTab.scss";
import Tab from "../UI/Tab/Tab";
import Datatable from "../UI/Datatable/Datatable";
import Dropdown from "../UI/Dropdown/Dropdown";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const assignTeacherTab = [
  {
    label: "Subject Teachers",
    value: "1",
    content: (
      <div className="subject-teacher__tab">
        <div className="subject-teacher-top__items">
          <Grid container spacing={1} className="subject-teacher__grid">
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Dropdown />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Button variant="contained" >
                <AddIcon /> Assign Teacher
              </Button>
            </Grid>
          </Grid>
        </div>
        <hr />
        <p className="table-title">Subject Teacher</p>
        <hr />
        <div className="subject-teacher__table">
          <Datatable />
        </div>
      </div>
    ),
  },
  {
    label: "Subject",
    value: "2",
    content: (
      <>
        {" "}
        <div className="subject">
          <Grid container spacing={4} className="subject-top__grid">
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Dropdown />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Dropdown />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Button variant="contained">
                <AddIcon />
                Assessiment Weight
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className="subject-table">
          <Datatable />
        </div>
      </>
    ),
  },
];

export default function AssignTeacherTab() {
  return <Tab tab_contents={assignTeacherTab} />;
}
