import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

export default function Datatable({ tableColumns, tableRows }) {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={tableRows}
        columns={tableColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        className="datatable"
        getRowId={(row) => row._id}
      />
    </div>
  );
}