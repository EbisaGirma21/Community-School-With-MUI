import "./CurriculumTab.scss";
import Tab from "../../UI/Tab/Tab";
import Modal from "../../UI/Modal/Modal";
import Dropdown from "../../UI/Dropdown/Dropdown";
import { Grid, TextField } from "@mui/material";
import CurriculumTable from "../Table/CurriculumTable";
import CurriculumModals from "../Modals/CurriculumModals";
import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import CurriculumContext from "../../../Context/CurriculumContext";

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

const CurriculumTab = () => {
  const [open, setOpen] = useState(false);

  const { fetchCurriculums } = useContext(CurriculumContext);

  // update local curriculum state when context curriculum changes
  useEffect(() => {
    fetchCurriculums();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // The information passed to tab of curriculum
  const curriculumTab = [
    {
      id: "1",
      label: "Basic info",
      value: "1",
      content: (
        <div>
          <div className="curriculum-modal">
            <Button
              onClick={handleOpen}
              variant="contained"
              className="add__button"
            >
              <AddIcon />
              New
            </Button>
            <CurriculumModals open={open} handleClose={handleClose} />
            <div className="curriculum-table">
              <CurriculumTable />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "2",
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
            <CurriculumTable />
          </div>
        </div>
      ),
    },
  ];

  return <Tab tab_contents={curriculumTab} />;
};

export default CurriculumTab;
