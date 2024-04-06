import { useFormContext, Controller } from 'react-hook-form';
// MUI imports
// Date picker imports
import { LocalizationProvider, DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type RHFDatePickerProps = {
  name: string;
  label: string;
  size?: 'small' | 'medium';
} & DatePickerProps<any>;

export function RHFDatePicker({ name, label, size = 'small', ...other }: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, value, ...rest }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slotProps={{
              textField: {
                fullWidth: true,
                label,
                error: !!error,
                helperText: error?.message,
                size,
              },
            }}
            value={value ? dayjs(value) : null} // Ensure value is converted to dayjs object or null
            {...other}
            {...rest}
          />
        </LocalizationProvider>
      )}
    />
  );
}
