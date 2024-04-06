import MuiPhoneNumber from 'material-ui-phone-number';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  size?: 'small' | 'medium';
};

export const RHFPhoneNumber: FC<Props> = ({ name, label, size = 'small' }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <MuiPhoneNumber
          fullWidth
          defaultCountry="in"
          size={size}
          inputRef={ref}
          {...field}
          variant="outlined"
          label={label}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
