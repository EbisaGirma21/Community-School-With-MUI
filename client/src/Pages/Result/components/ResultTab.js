import Tab from "../../../components/UI/Tab";
import { Box } from "@mui/material";
import RosterTable from "./RosterTable";
import MarkListTable from "./MarkListTable";

export default function ResultTab({
  acCurriculumId,
  semesterId,
  curriculumId,
  gradeId,
  sectionId,
  prevSemester
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const resultTab = [
    {
      id: "1",
      label: "Mark List",
      value: "1",
      content: (
        <Box>
          <MarkListTable
            acCurriculumId={acCurriculumId}
            semesterId={semesterId}
            curriculumId={curriculumId}
            gradeId={gradeId}
            sectionId={sectionId}
            prevSemester={prevSemester}

          />
        </Box>
      ),
    },

    {
      id: "2",
      label: "Roster",
      value: "2",
      content: (
        <Box>
          <RosterTable
            acCurriculumId={acCurriculumId}
            semesterId={semesterId}
            curriculumId={curriculumId}
            gradeId={gradeId}
            sectionId={sectionId}
          />
        </Box>
      ),
    },
  ];

  return <Tab tab_contents={resultTab} />;
}
