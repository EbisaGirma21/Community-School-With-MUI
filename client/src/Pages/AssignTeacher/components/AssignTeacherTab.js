import Tab from "../../../components/UI/Tab";
import { Box } from "@mui/material";
import HomeRoomTeacher from "./HomeRoomTeacher";
import SubjectTeacher from "./SubjectTeacher";

export default function AssignTeacherTab({ gradeId, acCurriculumId }) {
  const assignTeacherTab = [
    {
      id: "1",
      label: "Home Room Teacher",
      value: "1",
      content: (
        <Box>
          <HomeRoomTeacher gradeId={gradeId} acCurriculumId={acCurriculumId} />
        </Box>
      ),
    },
    {
      id: "2",
      label: "Subject Teachers",
      value: "2",
      content: (
        <Box>
         
          <SubjectTeacher gradeId={gradeId} acCurriculumId={acCurriculumId} />
        </Box>
      ),
    },
  ];
  return <Tab tab_contents={assignTeacherTab} />;
}
