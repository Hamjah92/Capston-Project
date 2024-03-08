import { CalendarPickerView, DatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RFHDatePickerTypes = {
  name: string;
  dateValue?: any;
  label: string;
  openTo?: CalendarPickerView;
  views?: any;
  disableFuture?: boolean;
  setValue: Dispatch<SetStateAction<Dayjs | null | undefined>>;
};

function RFHDatePicker({
  dateValue,
  name,
  label,
  openTo,
  views,
  setValue,
  ...other
}: RFHDatePickerTypes): JSX.Element {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...rest }, fieldState: { error } }) => (
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          openTo={openTo}
          views={views}
          inputFormat="DD/MM/YYYY"
          value={dateValue}
          {...other}
          onChange={(newValue: any) => {
            setValue(newValue);
          }}
          renderInput={(params: any) => <TextField {...params} />}
        />
        // </LocalizationProvider>
      )}
    />
  );
}

export default RFHDatePicker;
