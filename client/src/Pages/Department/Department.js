import Datatable from "../../components/UI/Datatable";
import Modal from "../../components/UI/Modal";
import { Box, TextField } from "@mui/material";

function Department() {
  const modalBody = [
    {
      bt_name: "New",
      title: "Merge Department",
      body: (
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="DepartmentTitle"
            label="Department Title"
            type="text"
            sx={{ minWidth: 300 }}
            variant="standard"
          />
        </div>
      ),
    },
  ];

  return (
    <Box>
      <Box >Department</Box>
      <Modal modalBody={modalBody} />
      <Datatable />
    </Box>
  );
}

export default Department;
