import { Box, Button, Card, Grid, Tab, Tabs } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import { useState } from 'react';
import { PricingDetails } from './PricingDetails';
import { StockDetails } from './StockDetails';
import { TaxDetails } from './TaxDetails';
import { AdditionalDetails } from './AdditionalDetails';

type Props = {
  isEdit: boolean;
  currentProduct?: any;
};

export default function ProductForm({ isEdit, currentProduct }: Props) {
  const methods = useForm<any>({});
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: any) => {
    console.log('Submitted');
  };

  function tabProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <RHFRadioGroup
                name="productType"
                defaultValue="goods"
                options={[
                  { label: 'Goods', value: 'goods' },
                  { label: 'Services', value: 'services' },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <RHFTextField name="productName" id="outlined-basic" label="Product Name" />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RHFTextField name="productDescription" label="Product description" />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Pricing details" {...tabProps(0)} />
                    <Tab label="Stock details" {...tabProps(1)} />
                    <Tab label="Tax details" {...tabProps(2)} />
                    <Tab label="Additional details" {...tabProps(3)} />
                  </Tabs>
                </Box>
                <PricingDetails index={0} value={value} />
                <StockDetails index={1} value={value} />
                <TaxDetails index={2} value={value} />
                <AdditionalDetails index={3} value={value} />
              </Box>
            </Grid>
          </Grid>
          <Grid style={{ textAlign: 'right' }}>
            <Button
              variant="text"
              // endIcon={<KeyboardTabIcon />}
            >
              {' '}
              Stock Details
            </Button>
          </Grid>

          <Grid style={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              // endIcon={<Add />}
            >
              {' '}
              Add Product
            </Button>
          </Grid>
        </Card>
      </FormProvider>
    </>
  );
}
