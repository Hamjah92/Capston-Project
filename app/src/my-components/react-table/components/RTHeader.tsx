import { SxProps, TableCell, TableHead, TableRow, TableSortLabel, Theme } from '@mui/material';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { FC } from 'react';

type Props = {
  HeaderGroups: HeaderGroup<any>[];
  sx?: SxProps<Theme>;
};

export const RTHeader: FC<Props> = ({ HeaderGroups, sx }) => (
  <TableHead sx={sx}>
    {HeaderGroups.map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableCell align="center" key={header.id}>
            {header.isPlaceholder ? null : header.column.getCanSort() ? (
              <TableSortLabel
                hideSortIcon
                active={!!header.column.getIsSorted()}
                direction={
                  header.column.getIsSorted()
                    ? (header.column.getIsSorted() as 'asc' | 'desc')
                    : 'asc'
                }
                onClick={header.column.getToggleSortingHandler()}
                sx={{ textTransform: 'capitalize' }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableSortLabel>
            ) : (
              flexRender(header.column.columnDef.header, header.getContext())
            )}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableHead>
);
