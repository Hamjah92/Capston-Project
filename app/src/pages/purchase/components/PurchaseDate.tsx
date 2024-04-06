// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
// components
import { RHFSelect } from 'src/components/hook-form';
import { RHFDatePicker } from 'src/components/hook-form/RFHDatePicker';
import { useSupplier } from 'src/hooks/myHooks/database/useSupplier';
import { SupplierType } from 'src/@types/supplier';
import { useQuery } from '@tanstack/react-query';

// ----------------------------------------------------------------------

export function PurchaseDate() {
  const { getAllSuppliers } = useSupplier();

  const { data } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getAllSuppliers,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <RHFSelect
        fullWidth
        size="small"
        name="supplierId"
        label="Supplier"
        InputLabelProps={{ shrink: true }}
        PaperPropsSx={{ textTransform: 'capitalize' }}
      >
        {data.map((option: SupplierType) => (
          <MenuItem key={option.supplierId} value={option.id!}>
            {option.supplierName}
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFSelect
        fullWidth
        size="small"
        name="status"
        label="Status"
        InputLabelProps={{ shrink: true }}
        PaperPropsSx={{ textTransform: 'capitalize' }}
      >
        {['paid', 'due', 'overdue'].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </RHFSelect>
      <RHFDatePicker name="purchaseDate" label="Purchase Date" />
      <RHFDatePicker name="dueDate" label="Due Date" />
    </Stack>
  );
}
