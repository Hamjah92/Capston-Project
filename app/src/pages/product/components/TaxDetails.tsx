import { Grid } from '@mui/material';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFCheckbox } from 'src/components/hook-form';
import { RHFAutoCompleteObject } from 'src/components/hook-form/RHFAutoCompleteObject';
import { MuiTabPanel } from 'src/my-components/common/ui/MuiTabPanel';

const taxRate = [
  { name: '0%', value: '0' },
  { name: '0.1%', value: '0.1' },
  { name: '0.25%', value: '0.25' },
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
  const { getValues, setValue } = useFormContext(); // retrieve those props

  return (
    <MuiTabPanel value={value} index={index}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RHFAutoCompleteObject
            optionLabel="name"
            label="Sales Tax"
            name="salesTax"
            options={taxRate}
            multiple
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFAutoCompleteObject
            optionLabel="name"
            label="Purchase Tax"
            name="PurchaseTax"
            options={taxRate}
            multiple
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFCheckbox
            name="SameTax"
            label="Purchase Tax Same As Sales"
            value={false}
            onClick={() => {
              if (getValues('SameTax')) {
                setValue('PurchaseTax', null);
              } else {
                setValue('PurchaseTax', getValues('salesTax'));
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFCheckbox name="taxesInclusive" label="Tax Inclusive" />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFCheckbox name="isFree" label="Free item" />
        </Grid>
      </Grid>
    </MuiTabPanel>
  );
};
