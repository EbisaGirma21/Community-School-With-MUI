import "./CurriculumTab.scss";
import Tab from "../UI/Tab/Tab";
import Datatable from "../UI/Datatable/Datatable";
import Modal from "../UI/Modal/Modal";
import Dropdown from "../UI/Dropdown/Dropdown";
import { Grid } from "@mui/material";

const curriculumTab = [
  {
    label: "Basic info",
    value: "1",
    content: (
      <div>
        <div className="curriculum-modal">
          <Modal />
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
          <Modal />
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
