import { Box, Grid } from "@mui/material";
import AssignTeacherTab from "./components/AssignTeacherTab";
import Dropdown from "../../components/UI/Dropdown";

function AssignTeacher() {
  return (
    <Box>
      <Box>
        AssignTeachers
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Dropdown />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Dropdown />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Dropdown />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Box>
          <AssignTeacherTab />
        </Box>
      </Box>
    </Box>
  );
}

export default AssignTeacher;
