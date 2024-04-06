import { FC, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Theme } from '@mui/material/styles';
import { Button, IconButton, SxProps, Table, TableContainer, Tooltip } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { RTBody } from './components/RTBody';
import { RTHeader } from './components/RTHeader';
import { RTTableSelectedAction } from './components/RTTableSelectedAction';

type Props = {
  tableData: object[];
  tableCols: ColumnDef<any, any>[];
  sx?: SxProps<Theme>;
  defaultDense?: boolean;
  handleDeleteSelectedRows: Function;
};

export const RTTable: FC<Props> = ({
  tableData,
  tableCols,
  sx,
  handleDeleteSelectedRows,
  defaultDense = true,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isDense, setDense] = useState(defaultDense);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const table = useReactTable({
    data: tableData,
    columns: tableCols,
    state: {
      rowSelection,
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    maxLeafRowFilterDepth: 0, // only filter root level parent rows out
  });
  const { getHeaderGroups, getRowModel, getSelectedRowModel } = table;
  const selected = getSelectedRowModel().flatRows;
  const numSelected = selected.length;
  return (
    <>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        {numSelected > 0 && (
          <RTTableSelectedAction
            numSelected={numSelected}
            table={table}
            dense={isDense}
            actions={
              <Tooltip title="Delete">
                <IconButton onClick={handleOpenConfirm} color="primary">
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            }
          />
        )}
        <Scrollbar>
          <Table size={isDense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <RTHeader HeaderGroups={getHeaderGroups()} sx={sx} table={table} />
            <RTBody RowModelData={getRowModel()} />
          </Table>
        </Scrollbar>
      </TableContainer>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteSelectedRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
};
