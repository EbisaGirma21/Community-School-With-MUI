import Tab from "../../../components/UI/Tab";
import { Box } from "@mui/material";
import RemarkRequest from "./RemarkRequest";
import RosterApproval from "./RosterApproval";
import TranscriptApproval from "./TranscriptApproval";


export default function RequestTab() {
  const requestTab = [
    {
      id: "1",
      label: "Remark Request",
      value: "1",
      content: (
        <Box>
          <RemarkRequest />
        </Box>
      ),
    },

    {
      id: "2",
      label: "Roster Approval",
      value: "2",
      content: (
        <>
          <Box>
            <RosterApproval/>
          </Box>
        </>
      ),
    },
    {
      id: "3",
      label: "Transcript Approval",
      value: "3",
      content: (
        <Box>
          <TranscriptApproval />
        </Box>
      ),
    },
    
  ];

  return <Tab tab_contents={requestTab} />;
}
