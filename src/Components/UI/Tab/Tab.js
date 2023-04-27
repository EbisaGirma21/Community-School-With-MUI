import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
export default function Tabs(props) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {props.tab_contents.map((tab_content) => (
              <Tab label={tab_content.label} value={tab_content.value || 1} />
            ))}
          </TabList>
        </Box>
        {props.tab_contents.map((tab_content) => (
          <TabPanel value={tab_content.value} className="tab-body">
            {tab_content.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
