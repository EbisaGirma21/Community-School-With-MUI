import Tab from "../../components/UI/Tab";
import { Box } from "@mui/material";
import Club from "./components/Club";
import ClubMember from "../ClubMember/ClubMember";

export default function ClubTab() {
  const clubTab = [
    {
      id: "1",
      label: "Basic Info",
      value: "1",
      content: (
        <Box>
          <Club />
        </Box>
      ),
    },

    {
      id: "2",
      label: "Club Members",
      value: "2",
      content: (
        <>
          <Box>
            <ClubMember />
          </Box>
        </>
      ),
    },
  ];

  return <Tab tab_contents={clubTab} />;
}
