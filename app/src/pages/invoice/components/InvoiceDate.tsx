// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
// components
import { RHFSelect } from 'src/components/hook-form';
import { RHFDatePicker } from 'src/components/hook-form/RFHDatePicker';
import { useQuery } from '@tanstack/react-query';
import { useCustomer } from 'src/hooks/myHooks/database/useCustomer';
import { Customer } from 'src/@types/customer';

// ----------------------------------------------------------------------

export default function InvoiceDate() {
  const { getAllCustomers } = useCustomer();

  const { data } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers,
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
        name="customerId"
        label="customer"
        InputLabelProps={{ shrink: true }}
        PaperPropsSx={{ textTransform: 'capitalize' }}
      >
        {data.map((option: Customer) => (
          <MenuItem key={option.customerId} value={option.customerId!}>
            {option.customerName}
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
      <RHFDatePicker name="invoiceDate" label="Invoice Date" />
      <RHFDatePicker name="dueDate" label="Due Date" />
    </Stack>
  );
}
