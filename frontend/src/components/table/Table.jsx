import { DataGrid } from "@mui/x-data-grid";

export default function Table({
  rows = [],
  columns = [],
  loading = false,
  getRowId,
  rowCount = 0,
  paginationModel,
  onPaginationModelChange,
  onRowClick,
}) {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        loading={loading}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={
          onPaginationModelChange
        }
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        onRowClick={onRowClick}
      />
    </div>
  );
}
