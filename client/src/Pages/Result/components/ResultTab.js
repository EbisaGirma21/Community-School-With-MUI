import Tab from "../../../components/UI/Tab";
import { Box } from "@mui/material";
import RosterTable from "./RosterTable";
import MarkListTable from "./MarkListTable";

export default function ResultTab({
  acCurriculumId,
  curriculumId,
  gradeId,
  sectionId,
}) {
  const resultTab = [
    {
      id: "1",
      label: "Mark List",
      value: "1",
      content: (
        <Box>
          <MarkListTable
            acCurriculumId={acCurriculumId}
            curriculumId={curriculumId}
            gradeId={gradeId}
            sectionId={sectionId}
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
