import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IProps = {
  name: string;
  label: string;
  options: object[];
  optionLabel: string;
  multiple?: boolean;
  onchangeFn?: (...arns: any[]) => any;
  size?: 'small' | 'medium';
};

type Props = IProps & TextFieldProps;

export const RHFAutoCompleteObject: FC<Props> = ({
  name,
  label,
  options,
  optionLabel,
  multiple = false,
  onchangeFn,
  size = 'medium',
}) => {
  const { control } = useFormContext();
  const initialValue = multiple ? [] : null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...restField }, fieldState: { error } }) => (
        <Autocomplete
          {...restField}
          options={options}
          multiple={multiple}
          fullWidth
          size={size}
          getOptionLabel={(option: any) => option[optionLabel]}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              inputRef={ref}
              {...params}
              fullWidth
              label={label}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          // onChange={(event, data) => setValue(restField.name, data)}
          onChange={(_, data) => {
            restField.onChange(data);
            if (onchangeFn) onchangeFn(_, data); // Call onchangeFn with the specific arguments
          }}
          value={restField.value || initialValue}
        />
      )}
    />
  );
};
