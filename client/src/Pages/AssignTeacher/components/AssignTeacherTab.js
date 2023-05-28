import Tab from "../../../components/UI/Tab";
import { Box } from "@mui/material";

const assignTeacherTab = [
  {
    label: "Home Room Teacher",
    value: "1",
    content: <Box></Box>,
  },
  {
    label: "Subject Teachers",
    value: "2",
    content: <Box></Box>,
  },
];

export default function AssignTeacherTab() {
  return <Tab tab_contents={assignTeacherTab} />;
}
