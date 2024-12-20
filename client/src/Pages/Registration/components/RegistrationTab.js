import Tab from "../../../components/UI/Tab";
import { Box } from "@mui/material";
import Section from "../../Section/Section";
import { SectionProvider } from "../../../context/SectionContext";
import Enrollement from "../../Enrollement/Enrollement";
import NewStudent from "../../NewStudent/NewStudent";
import Deregistration from "../../Deregistration/Deregistration";
import { StudentEnrollmentProvider } from "../../../context/EnrollmentContext";
import { StudentProvider } from "../../../context/StudentContext";

export default function RegisrationTab({ acSession, acCurriculumId, gradeId }) {
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
              <StudentEnrollmentProvider>
                <Enrollement
                  acCurriculumId={acCurriculumId}
                  gradeId={gradeId}
                />
              </StudentEnrollmentProvider>
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
          <SectionProvider>
            <StudentProvider>
              <StudentEnrollmentProvider>
                <Deregistration
                  acSession={acSession}
                  acCurriculumId={acCurriculumId}
                  gradeId={gradeId}
                />
              </StudentEnrollmentProvider>
            </StudentProvider>
          </SectionProvider>
        </Box>
      ),
    },
  ];

  return <Tab tab_contents={registrationTab} />;
}
