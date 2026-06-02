import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useRef } from "react";

export default function Table({
  rows = [],
  columns = [],
  loading = false,
  getRowId,
  rowCount = 0,
  paginationModel,
  onPaginationModelChange,
  onRowClick,
  sortModel,
  onSortModelChange,
}) {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSortModelChange = useCallback(
    (newSortModel) => {
      if (!isMountedRef.current) return;
      onSortModelChange?.(newSortModel);
    },
    [onSortModelChange],
  );

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
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[7, 25, 50, 100]}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        disableRowSelectionOnClick
        onRowClick={onRowClick}
      />
    </div>
  );
}
