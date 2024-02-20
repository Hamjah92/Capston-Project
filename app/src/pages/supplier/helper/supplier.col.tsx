import { ColumnDef } from '@tanstack/react-table';
import { SupplierType } from 'src/@types/supplier';
import { RTActions } from 'src/my-components/react-table/components/RTActions';
import { SupplierActions } from '../components/SupplierAction';
import { RTCheckBox } from '../../../my-components/react-table/components/RTCheckBox';

export const supplierCols: ColumnDef<SupplierType, any>[] = [
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
    accessorKey: 'supplierId',
    header: 'Id',
  },
  {
    accessorKey: 'supplierName',
    header: 'Name',
  },
  {
    accessorKey: 'supplierPhone',
    header: 'Phone',
  },
  {
    accessorKey: 'supplierEmail',
    header: 'Email',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ cell }) => <RTActions row={cell.row} Actions={SupplierActions} />,
  },
];
