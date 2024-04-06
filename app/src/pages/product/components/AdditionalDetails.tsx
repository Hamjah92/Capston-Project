import { Grid } from '@mui/material';
import { Dayjs } from 'dayjs';
import { FC, useState } from 'react';
import { RHFAutoCompleteObject } from 'src/components/hook-form/RHFAutoCompleteObject';
import { MuiTabPanel } from 'src/my-components/common/ui/MuiTabPanel';
import { RHFDatePicker } from 'src/components/hook-form/RFHDatePicker';

const units = [
  { name: 'KG', value: 'kg' },
  { name: 'BOX', value: 'BOX' },
];
const productCategory = [
  {
    name: 'Plumbing',
    value: 'plumbing',
  },
  {
    name: 'Sanitary',
    value: 'sanitary',
  },
];
type Props = {
  value: number;
  index: number;
};
export const AdditionalDetails: FC<Props> = ({ value, index }) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>();
  return (
    <MuiTabPanel value={value} index={index}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <RHFAutoCompleteObject
            optionLabel="name"
            name="productCategory"
            label="Product Category"
            options={productCategory}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFAutoCompleteObject
            optionLabel="name"
            name="productSubCategory"
            label="Product Sub Category"
            options={productCategory}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFAutoCompleteObject
            optionLabel="name"
            name="supplyType"
            label="Supply Type"
            options={productCategory}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFAutoCompleteObject
            optionLabel="name"
            name="supplyCategory"
            label="Supply Category"
            options={productCategory}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFDatePicker name="activeFrom" label="Active from" />
        </Grid>
        <Grid item xs={12} md={3}>
          <RHFDatePicker name="expireOn" label="Expire on" />{' '}
        </Grid>
      </Grid>
    </MuiTabPanel>
  );
};
