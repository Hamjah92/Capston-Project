import { FormControlLabel, Grid, IconButton, Switch } from '@mui/material';
import { Dayjs } from 'dayjs';
import { FC, useState } from 'react';
import { RHFAutocomplete, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import { MuiTabPanel } from 'src/my-components/common/ui/MuiTabPanel';

const units = [
  { name: 'KG', value: 'kg' },
  { name: 'BOX', value: 'BOX' },
];
const taxRate = [
  { name: '0%', value: '0' },
  { name: '0.1%', value: '0.1' },
  { name: '0.25%', value: '0.25' },
  { name: '0.1%', value: '0.1' },
  { name: '1%', value: '1' },
  { name: '1.5%', value: '1' },
  { name: '3%', value: '3' },
  { name: '5%', value: '5' },
  { name: '7.5%', value: '7.5' },
  { name: '12%', value: '12' },
  { name: '18%', value: '18' },
  { name: '28%', value: '28' },
];
type Props = {
  value: number;
  index: number;
};
export const TaxDetails: FC<Props> = ({ value, index }) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>();
  return (
    <MuiTabPanel value={value} index={index}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <RHFTextField name="hsnSacCode" type="number" label="HSN/SAC" />
        </Grid>
        <Grid item xs={12} md={8}>
          <RHFTextField name="hsnSacDescription" type="text" label="HSN/SAC Description" />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFAutocomplete name="gstRate" label="GST" options={taxRate} />
        </Grid>
        <Grid item xs={12} md={2}>
          <RHFAutocomplete name="cGstRate" label="CGST" options={taxRate} />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFAutocomplete name="sGSTUtGSTRate" label="SGST/UTSGST" options={taxRate} />
        </Grid>
        <Grid item xs={12} md={2}>
          <RHFAutocomplete name="iGSTRate" label="IGST" options={taxRate} />
        </Grid>
        <Grid item xs={12} md={2}>
          <RHFTextField type="number" name="cessRate" label="Cess" />
        </Grid>

        <Grid item xs={12} md={4}>
          <RHFCheckbox name="taxInclusiive" label="Tax Inclusive" />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFCheckbox name="freeItem" label="Free item" />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFCheckbox name="includeStockValuation" label="Include stock valuation?" />
        </Grid>
      </Grid>
    </MuiTabPanel>
  );
};
