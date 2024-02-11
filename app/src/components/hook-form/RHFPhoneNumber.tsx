import MuiPhoneNumber from 'material-ui-phone-number';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
};

export const RHFPhoneNumber: FC<Props> = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ...field }, fieldState: { error } }) => (
        <MuiPhoneNumber
          fullWidth
          defaultCountry="in"
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
