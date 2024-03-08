import { Grid, IconButton } from '@mui/material';
import { Dayjs } from 'dayjs';
import { FC, useState } from 'react';
import { RHFAutocomplete, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import RFHDatePicker from 'src/components/hook-form/RFHDatePicker';
import { MuiTabPanel } from 'src/my-components/common/ui/MuiTabPanel';

const units = [
  { name: 'KG', value: 'kg' },
  { name: 'BOX', value: 'BOX' },
];
type Props = {
  value: number;
  index: number;
};

export const StockDetails: FC<Props> = ({ value, index }) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>();
  return (
    <MuiTabPanel value={value} index={index}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <RHFTextField name="openingStock" type="number" label="Opening stock" />
        </Grid>
        <Grid item xs={12} md={4}>
          <RFHDatePicker
            disableFuture
            name="date"
            setValue={setDateValue}
            openTo="day"
            views={['year', 'month', 'day']}
            dateValue={dateValue}
            label="Date"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <RHFTextField
            type="number"
            placeholder="Ex: 10"
            name="lowStockThreshold"
            label="Low Stock Threshold"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <RHFCheckbox name="isSalable" label="Is Salable item?" checked />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFCheckbox name="isStockable" label="Is Stock able?" checked />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFCheckbox name="includeStockValuation" label="Include Stock Valuation?" checked />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFCheckbox name="lowStockWarning" label="Low Stock Warning" checked />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFCheckbox name="activeSupply" label="Active Supply" checked />
        </Grid>
      </Grid>
    </MuiTabPanel>
  );
};
