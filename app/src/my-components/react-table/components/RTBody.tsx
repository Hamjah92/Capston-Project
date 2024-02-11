import { TableBody, TableCell, TableRow } from '@mui/material';
import { flexRender, RowModel } from '@tanstack/react-table';
import { FC } from 'react';
import TableNoData from 'src/components/table/table-no-data';

type Props = {
  RowModel: RowModel<any>;
};

export const RTBody: FC<Props> = ({ RowModel }) => (
  <TableBody>
    <>
      {RowModel.rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <TableCell align="center" key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
      <TableNoData notFound={RowModel.rows.length < 1} />
    </>
  </TableBody>
);
