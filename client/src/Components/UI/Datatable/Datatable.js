import "./Datatable.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Datatable({
  tableColumns,
  tableRows,
  onDelete,
  onEdit,
}) {
  const handleEdit = (id) => {
    // Handle edit logic here
    onEdit(id);
    console.log(`Edit row with ID ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    onDelete(id);
  };

  const columnsWithActions = [
    ...tableColumns,
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 150,
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEdit(params.id)}
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(params.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={tableRows}
        columns={columnsWithActions}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        className="datatable"
        getRowId={(row) => row._id}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
