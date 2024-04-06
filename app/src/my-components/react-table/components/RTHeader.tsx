import {
  SxProps,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Theme,
} from '@mui/material';
import { flexRender, HeaderGroup, Table } from '@tanstack/react-table';
import { FC } from 'react';
import { Filter } from './a';

type Props = {
  HeaderGroups: HeaderGroup<any>[];
  sx?: SxProps<Theme>;
  table: Table<any>;
};

export const RTHeader: FC<Props> = ({ HeaderGroups, sx, table }) => {
  const renderHeader = (header: any) => {
    if (header.isPlaceholder) {
      return null;
    }

    if (header.column.getCanSort()) {
      return (
        <TableSortLabel
          hideSortIcon
          active={!!header.column.getIsSorted()}
          direction={
            header.column.getIsSorted() ? (header.column.getIsSorted() as 'asc' | 'desc') : 'asc'
          }
          onClick={header.column.getToggleSortingHandler()}
          sx={{ textTransform: 'capitalize' }}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </TableSortLabel>
      );
    }

    return flexRender(header.column.columnDef.header, header.getContext());
  };

  return (
    <TableHead sx={sx}>
      {HeaderGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell align="center" key={header.id}>
              {renderHeader(header)}
              {header.column.getCanFilter() ? (
                <div>
                  <Filter column={header.column} table={table} />
                </div>
              ) : null}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};
