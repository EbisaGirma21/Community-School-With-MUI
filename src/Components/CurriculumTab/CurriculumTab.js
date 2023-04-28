import "./CurriculumTab.scss";
import Tab from "../UI/Tab/Tab";
import Datatable from "../UI/Datatable/Datatable";
import Modal from "../UI/Modal/Modal";
import Dropdown from "../UI/Dropdown/Dropdown";
import { Grid, TextField } from "@mui/material";

// Basic information of Curriculum Form
const basicInfo = [
  {
    bt_name: "New",
    title: "New Curriculum",
    body: (
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="max-semester"
          label="Title"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="max-semester"
          label="Curriculum Year"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
        />

        <Dropdown />

        <Dropdown />
        <TextField
          autoFocus
          margin="dense"
          id="max-semester"
          label="Maximum Load"
          type="number"
          sx={{ minWidth: 300 }}
          variant="standard"
        />
      </div>
    ),
  },
];

// Subject Information input form
const subjectInfo = [
  {
    bt_name: "Add Subject",
    title: "Add Subject",
    body: (
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="max-semester"
          label="Module"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
        />

        <Dropdown />
      </div>
    ),
  },
];

// The information passed to tab of curriculum
const curriculumTab = [
  {
    label: "Basic info",
    value: "1",
    content: (
      <div>
        <div className="curriculum-modal">
          <Modal modalBody={basicInfo} />
        </div>
        <div className="curriculum-table">
          <Datatable />
        </div>
      </div>
    ),
  },
  {
    label: "Subjects",
    value: "2",
    content: (
      <div>
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
          <Modal modalBody={subjectInfo} />
        </div>
        <div className="curriculum-table">
          <Datatable />
        </div>
      </div>
    ),
  },
];

const CurriculumTab = () => {
  return <Tab tab_contents={curriculumTab} />;
};

export default CurriculumTab;
