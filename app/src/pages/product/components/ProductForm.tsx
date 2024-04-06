import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'src/components/snackbar';
import { Box, Card, Grid, Tab, Tabs } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import { AddProductType } from 'src/@types/product';
import { NestCommonRes } from 'src/@types/https';
import { useErrorFocus } from 'src/hooks/utilityHooks/useErrorFocus';
import { newProductSchema } from 'src/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useProduct } from 'src/hooks/myHooks/database/useProduct';
import { RHFSubmitButton } from 'src/components/hook-form/RHFSubmitButton';
import { PricingDetails } from './PricingDetails';
import { StockDetails } from './StockDetails';
import { TaxDetails } from './TaxDetails';

type Props = {
  isEdit: boolean;
  currentProduct?: any;
};

export default function ProductForm({ isEdit, currentProduct }: Props) {
  const { defaultProduct, createProduct, editProduct } = useProduct();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { productId } = useParams();

  const defaultValues: AddProductType = useMemo(
    () => defaultProduct(currentProduct),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm<AddProductType>({
    resolver: yupResolver<AddProductType>(newProductSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = methods;

  console.log(errors);

  useErrorFocus({ errors, setFocus });

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit, defaultValues, reset]);

  const onSubmit = async (data: any) => {
    const { SameTax, ...restData } = data;

    try {
      let res: NestCommonRes;
      if (!isEdit) {
        res = await createProduct(restData);
      } else {
        res = await editProduct(restData, productId!);
      }
      enqueueSnackbar(res!.message, { variant: res!.type });
      navigate('/dashboard/product/list');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
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
    <FormProvider methods={methods}>
      <Card sx={{ p: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <RHFRadioGroup
              name="productType"
              defaultValue="goods"
              options={[
                { label: 'Goods', value: 'GOODS' },
                { label: 'Services', value: 'SERVICE' },
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
                  {/* <Tab label="Additional details" {...tabProps(3)} /> */}
                </Tabs>
              </Box>
              <PricingDetails index={0} value={value} />
              <StockDetails index={1} value={value} />
              <TaxDetails index={2} value={value} />
              {/* <AdditionalDetails index={3} value={value} /> */}
            </Box>
          </Grid>
        </Grid>

        <Grid style={{ textAlign: 'center' }}>
          <RHFSubmitButton onClick={handleSubmit(onSubmit)}>
            {!isEdit ? 'Add' : 'Save Changes'}
          </RHFSubmitButton>
        </Grid>
      </Card>
    </FormProvider>
  );
}
