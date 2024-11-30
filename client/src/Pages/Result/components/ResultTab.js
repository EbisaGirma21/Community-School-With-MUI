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
  currentStatus,
  currentSectionHomeRoom,
  subjectIds,
  classStartDate,
  classEndDate,
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
            currentStatus={currentStatus}
            subjectIds={subjectIds}
            classStartDate={classStartDate}
            classEndDate={classEndDate}
          />
        </Box>
      ),
    },

    {
      id: "2",
      label: "Roster",
      value: "2",
      style: {
        display:
          user.role.includes("director") || user.role.includes("homeRoom")
            ? "block"
            : "none",
      },

      content: (
        <Box
          display={
            currentSectionHomeRoom || user.role.includes("director")
              ? "block"
              : "none"
          }
        >
          <RosterTable
            acCurriculumId={acCurriculumId}
            semesterId={semesterId}
            curriculumId={curriculumId}
            gradeId={gradeId}
            sectionId={sectionId}
            currentStatus={currentStatus}
          />
        </Box>
      ),
    },
  ];

  return <Tab tab_contents={resultTab} />;
}
