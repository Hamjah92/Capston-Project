import { useFormContext, Controller } from 'react-hook-form';
// @mui
import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode;
}

export function RHFSwitch({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            control={<Switch {...field} inputRef={ref} checked={field.value} />}
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}
