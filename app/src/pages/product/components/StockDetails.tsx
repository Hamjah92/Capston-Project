import { Grid } from '@mui/material';
import { FC } from 'react';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import { MuiTabPanel } from 'src/my-components/common/ui/MuiTabPanel';

type Props = {
  value: number;
  index: number;
};

export const StockDetails: FC<Props> = ({ value, index }) => (
  <MuiTabPanel value={value} index={index}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <RHFTextField name="openingQuantity" type="number" label="Opening Quantity" />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTextField
          type="number"
          placeholder="Ex: 10"
          name="lowStockReminder"
          label="Low Stock Threshold"
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <RHFCheckbox name="lowStockWarning" label="Low Stock Warning" checked />
      </Grid>
    </Grid>
  </MuiTabPanel>
);
