import { ColumnDef } from '@tanstack/react-table';
import { RTActions } from 'src/my-components/react-table/components/RTActions';
import { RTCheckBox } from 'src/my-components/react-table/components/RTCheckBox';
import { ProductType } from 'src/@types/product';
import { ProductAction } from '../components/ProductAction';

export const productCols: ColumnDef<ProductType, any>[] = [
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
    accessorKey: 'productId',
    header: 'Id',
  },
  {
    accessorKey: 'productName',
    header: 'Name',
  },
  {
    accessorKey: 'productCode',
    header: 'Product Code',
  },
  {
    accessorKey: 'availableQuantity',
    header: 'Available Quantity',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ cell }) => <RTActions row={cell.row} Actions={ProductAction} />,
  },
];
