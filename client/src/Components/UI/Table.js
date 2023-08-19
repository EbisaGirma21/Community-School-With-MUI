import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport sx={{ color: "#5E35B1" }} />
    </GridToolbarContainer>
  );
}

export default function Table({ tableColumns, tableRows, setSelectedRows }) {
  const handleRowSelection = (param) => {
    setSelectedRows(param);
  };

  return (
    <Box style={{ height: 500, m: 1 }}>
      <DataGrid
        rows={tableRows}
        columns={tableColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        className="datatable"
        getRowId={(row) => row._id}
        onRowSelectionModelChange={(param) => handleRowSelection(param)}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}
