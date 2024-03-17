import { ColumnDef } from '@tanstack/react-table';
import { RTActions } from 'src/my-components/react-table/components/RTActions';
import { RTCheckBox } from 'src/my-components/react-table/components/RTCheckBox';
import { TaxActions } from '../components/TaxAction';

export const taxCols: ColumnDef<TaxType, any>[] = [
  {
    id: 'selection',
    header: ({ table }) => (
      <RTCheckBox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <RTCheckBox
        {...{
          checked: row.getIsSelected(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'taxName',
    header: 'Name',
  },
  {
    accessorKey: 'taxRate',
    header: 'Rate',
  },
  {
    accessorKey: 'taxType',
    header: 'Type',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ cell }) => <RTActions row={cell.row} Actions={TaxActions} />,
  },
];
