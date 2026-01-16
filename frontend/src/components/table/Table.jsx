import { DataGrid } from "@mui/x-data-grid";

export default function Table({
  rows = [],
  columns = [],
  loading = false,
  getRowId,
  pageSize = 10,
  onRowClick,
}) {
  return (
    <div style={{ width: "100%", height: 520 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        loading={loading}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        disableRowSelectionOnClick
        onRowClick={onRowClick}
      />
    </div>
  );
}
