import Tab from "../../../components/UI/Tab";
import { Box } from "@mui/material";
import Section from "../../Section/Section";
import { SectionProvider } from "../../../context/SectionContext";
import Enrollement from "../../Enrollement/Enrollement";
import NewStudent from "../../NewStudent/NewStudent";
import Deregistration from "../../Deregistration/Deregistration";
import { ElligibleStudentProvider } from "../../../context/EnrollmentContext";

export default function RegisrationTab({ acCurriculumId, gradeId }) {
  const registrationTab = [
    {
      id: "1",
      label: "New Student",
      value: "1",
      content: (
        <Box>
          <NewStudent />
        </Box>
      ),
    },

    {
      id: "2",
      label: "Section",
      value: "2",
      content: (
        <>
          <Box>
            <SectionProvider>
              <Section acCurriculumId={acCurriculumId} gradeId={gradeId} />
            </SectionProvider>
          </Box>
        </>
      ),
    },
    {
      id: "3",
      label: "Enrollment",
      value: "3",
      content: (
        <Box>
          <Box>
            <SectionProvider>
              <ElligibleStudentProvider>
                <Enrollement
                  acCurriculumId={acCurriculumId}
                  gradeId={gradeId}
                />
              </ElligibleStudentProvider>
            </SectionProvider>
          </Box>
        </Box>
      ),
    },
    {
      id: "4",
      label: "Deregistration",
      value: "4",
      content: (
        <Box>
          <Deregistration />
        </Box>
      ),
    },
  ];

  return <Tab tab_contents={registrationTab} />;
}
