import { SxProps, TableCell, TableHead, TableRow, TableSortLabel, Theme } from '@mui/material';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { FC } from 'react';

type Props = {
  HeaderGroups: HeaderGroup<any>[];
  sx?: SxProps<Theme>;
};

export const RTHeader: FC<Props> = ({ HeaderGroups, sx }) => {
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
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};
