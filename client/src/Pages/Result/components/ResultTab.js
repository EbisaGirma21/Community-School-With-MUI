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
  semesterOption,
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
      label:
        user.role.includes("director") || currentSectionHomeRoom
          ? "Roster"
          : "",
      value: "2",
      sx: {
        display:
          user.role.includes("director") || currentSectionHomeRoom
            ? "block"
            : "none",
      },
      disabled:
        user.role.includes("director") || currentSectionHomeRoom ? false : true,
      content: (
        <Box
          display={
            currentSectionHomeRoom || user.role.includes("director")
              ? "block"
              : "none"
          }
        >
          {user.role.includes("director") || currentSectionHomeRoom ? (
            <RosterTable
              acCurriculumId={acCurriculumId}
              semesterId={semesterId}
              curriculumId={curriculumId}
              gradeId={gradeId}
              sectionId={sectionId}
              currentStatus={currentStatus}
              semesterOption={semesterOption}
            />
          ) : null}
        </Box>
      ),
    },
  ];

  return <Tab tab_contents={resultTab} />;
}
