import { Grid } from '@mui/material';
import { FC } from 'react';
import { RHFTextField } from 'src/components/hook-form';
import { RHFAutoCompleteObject } from 'src/components/hook-form/RHFAutoCompleteObject';
import { MuiTabPanel } from 'src/my-components/common/ui/MuiTabPanel';

type Props = {
  value: number;
  index: number;
};
const discountTypes = [
  { name: '%', value: 'percentage' },
  { name: 'fix', value: 'fix' },
];
const units = [
  { name: 'KG', value: 'kg' },
  { name: 'BOX', value: 'BOX' },
];
export const PricingDetails: FC<Props> = ({ value, index }) => (
  <MuiTabPanel value={value} index={index}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <RHFTextField name="productCode" label="Product Code" />
      </Grid>

      <Grid item xs={12} md={3}>
        <RHFTextField name="discount" label="Discount" />
      </Grid>
      <Grid item xs={12} md={3}>
        <RHFAutoCompleteObject
          optionLabel="name"
          options={discountTypes}
          name="discountIn"
          label="in"
          defaultValue="%"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <RHFTextField name="purchasePrice" type="number" label="Purchase Price" />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFAutoCompleteObject
          optionLabel="name"
          name="purchaseUnit"
          label="Purchase Unit"
          options={units}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <RHFTextField name="salesPrice" type="number" label="Sales Price" />
      </Grid>

      <Grid item xs={12} md={6}>
        <RHFAutoCompleteObject
          optionLabel="name"
          name="salesUnit"
          label="Sales Unit"
          options={units}
        />
      </Grid>
    </Grid>
  </MuiTabPanel>
);
