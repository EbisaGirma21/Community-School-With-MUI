import Tab from "../../../components/UI/Tab";
import { Box } from "@mui/material";
import MarkTable from "./MarkTable";

export default function ResultTab({
  acCurriculumId,
  curriculumId,
  gradeId,
  sectionId,
}) {
  const resultTab = [
    {
      id: "1",
      label: "Roster",
      value: "1",
      content: (
        <Box>
          <MarkTable
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
      label: "Mark List",
      value: "2",
      content: (
        <>
          <Box>On progress</Box>
        </>
      ),
    },
  ];

  return <Tab tab_contents={resultTab} />;
}
