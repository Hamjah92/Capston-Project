import { ColumnDef } from '@tanstack/react-table';
import { RTActions } from 'src/my-components/react-table/components/RTActions';
import { RTCheckBox } from 'src/my-components/react-table/components/RTCheckBox';
import { PurchaseType } from 'src/@types/purchase';
import { PurchaseAction } from '../components/PurchaseAction';

export const purchaseCols: ColumnDef<PurchaseType, any>[] = [
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
    accessorKey: 'purchaseId',
    header: 'Id',
  },
  {
    accessorKey: 'netTotal',
    header: 'Net Total',
  },
  {
    accessorKey: 'purchaseDate',
    header: 'Purchase Date',
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ cell }) => <RTActions row={cell.row} Actions={PurchaseAction} />,
  },
];
