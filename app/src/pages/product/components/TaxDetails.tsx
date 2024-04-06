import { Grid } from '@mui/material';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFCheckbox } from 'src/components/hook-form';
import { RHFAutoCompleteObject } from 'src/components/hook-form/RHFAutoCompleteObject';
import { useTax } from 'src/hooks/myHooks/database/useTax';
import { MuiTabPanel } from 'src/my-components/common/ui/MuiTabPanel';

type Props = {
  value: number;
  index: number;
};
export const TaxDetails: FC<Props> = ({ value, index }) => {
  const { getValues, setValue } = useFormContext(); // retrieve those props
  const { taxQuery } = useTax();
  const { data: taxRate, isLoading } = taxQuery;
  console.log(taxRate);

  if (isLoading) return 'Loading';
  return (
    <MuiTabPanel value={value} index={index}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RHFAutoCompleteObject
            optionLabel="taxName"
            label="Sales Tax"
            name="salesTax"
            multiple
            options={taxRate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFAutoCompleteObject
            optionLabel="taxName"
            label="Purchase Tax"
            name="purchaseTax"
            multiple
            options={taxRate}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RHFCheckbox
            name="SameTax"
            label="Purchase Tax Same As Sales"
            value={false}
            onClick={() => {
              if (getValues('SameTax')) {
                setValue('purchaseTax', null);
              } else {
                setValue('purchaseTax', getValues('salesTax'));
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
