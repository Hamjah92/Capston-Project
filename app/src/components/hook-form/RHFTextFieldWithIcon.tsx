// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  button: any;
  size?: 'small' | 'medium';
};

export function RHFTextFieldWithIcon({ name, button, size = 'small', ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          fullWidth
          size={size}
          inputRef={ref}
          autoComplete="off"
          error={!!error}
          helperText={error?.message}
          {...field}
          InputProps={{
            endAdornment: <InputAdornment position="end">{button}</InputAdornment>,
          }}
          {...other}
        />
      )}
    />
  );
}
