import Tab from "../../components/UI/Tab";
import Datatable from "../../components/UI/Datatable";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Dropdown from "../../components/UI/Dropdown";
import NewStudentTable from "./components/NewStudentTable";

const registrationTab = [
  {
    id: "1",
    label: "Enrollment",
    value: "1",
    content: (
      <Box>
        <Box>
          <Grid
            container
            spacing={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Button variant="contained">
                <DoneIcon /> Display Elligible Students
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Button variant="contained">
                <AddIcon />
                Enrol Elligible Students
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Typography>List of Eligible students</Typography>
        <Divider />
      </Box>
    ),
  },
  {
    id: "2",
    label: "Deregistration",
    value: "2",
    content: (
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="error">
          <RemoveIcon /> Deregister selected Student
        </Button>
      </Box>
    ),
  },
  {
    id: "3",
    label: "New Student",
    value: "3",
    content: (
      <>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained">
            <AddIcon /> Register New Student
          </Button>
        </Box>
        <Box>
          <NewStudentTable />
        </Box>
      </>
    ),
  },
  {
    id: "4",
    label: "Transfer Student",
    value: "4",
    content: (
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained">
          <AddIcon /> Register Transfer Student
        </Button>
      </Box>
    ),
  },
];

export default function RegisrationTab() {
  return <Tab tab_contents={registrationTab} />;
}
