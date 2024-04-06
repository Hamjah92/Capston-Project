import { ColumnDef } from '@tanstack/react-table';
import { InvoiceType } from 'src/@types/invoice';
import { RTActions } from 'src/my-components/react-table/components/RTActions';
import { RTCheckBox } from 'src/my-components/react-table/components/RTCheckBox';
import { InvoiceAction } from '../components/InvoiceAction';

export const invoiceCols: ColumnDef<InvoiceType, any>[] = [
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
    accessorKey: 'invoiceId',
    header: 'Id',
  },
  {
    accessorKey: 'netTotal',
    header: 'Net Total',
  },
  {
    accessorKey: 'invoiceDate',
    header: 'invoice Date',
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ cell }) => <RTActions row={cell.row} Actions={InvoiceAction} />,
  },
];
