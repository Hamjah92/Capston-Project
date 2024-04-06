import { useEffect, useMemo } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorFocus } from 'src/hooks/utilityHooks/useErrorFocus';

import { useForm } from 'react-hook-form';
// @mui
import { Card, Grid, Stack } from '@mui/material';
// components
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useCustomer } from 'src/hooks/myHooks/database/useCustomer';
import { NewCustomerSchema } from 'src/validation';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

import { ButtonAccordion } from 'src/my-components/common/button/ButtonAccordion';

import { RHFSubmitButton } from 'src/components/hook-form/RHFSubmitButton';
import { NestCommonRes } from 'src/@types/https';

import { IAddress } from 'src/@types/address';
import {
  FormProvider,
  RHFTextField,
  RHFPhoneNumber,
  RHFTextFieldWithIcon,
} from '../../../components/hook-form';
import { AddressRow } from './AddressRow';
import { useAddress } from '../../../hooks/utilityHooks/useAddress';
import { boxGridSx } from '../../../utils/CommonSX';
import { CustForm, CustomerWithAddress } from '../../../@types/customer';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
  currentCustomer?: CustForm;
  defaultBillingAddresses?: IAddress[];
};

export default function CustomerForm({ isEdit, currentCustomer, defaultBillingAddresses }: Props) {
  const { defaultCustomer, createCustomer, editCustomer } = useCustomer();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { customerId } = useParams();

  const defaultValues: CustForm = useMemo(
    () => defaultCustomer(currentCustomer),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCustomer]
  );

  const BillingAddresses = useAddress([], 'Billing');

  const methods = useForm<CustForm>({
    resolver: yupResolver<CustForm>(NewCustomerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = methods;

  useErrorFocus({ errors, setFocus });

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit, defaultValues, reset]);

  const onSubmit = async (data: any) => {
    const FormData: CustomerWithAddress = { ...data, addresses: [...BillingAddresses.addresses] };

    try {
      let res: NestCommonRes;
      if (!isEdit) {
        res = await createCustomer(FormData);
      } else {
        res = await editCustomer(FormData, customerId!);
      }
      enqueueSnackbar(res!.message, { variant: res!.type });
      navigate('/dashboard/customer/list');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (defaultBillingAddresses !== undefined)
      BillingAddresses.setAddresses(defaultBillingAddresses);
  }, [defaultBillingAddresses]);

  return (
    <FormProvider methods={methods}>
      <Card sx={{ p: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={8} md={6}>
            <RHFTextFieldWithIcon
              name="customerGST"
              button={
                <LoadingButton
                  loadingPosition="start"
                  startIcon={<SearchSharpIcon />}
                  variant="outlined"
                  color="info"
                >
                  Fetch
                </LoadingButton>
              }
              label="GSTIN"
            />
          </Grid>
          <Grid item xs={4} md={6} />

          <Grid item xs={12} md={6}>
            <RHFTextField name="customerName" label="Customer Name" required />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="customerBusinessName" label="Trade Name" required />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFPhoneNumber name="customerPhone" label="Phone" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="customerEmail" label="Email Address" required />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="customerPAN" label="Customer PAN" />
          </Grid>

          <Grid item xs={12}>
            <ButtonAccordion
              title="Address"
              sx={boxGridSx}
              defaultOpen={defaultBillingAddresses && true}
            >
              <AddressRow addressesObject={BillingAddresses} title="Add Billing Address" />
            </ButtonAccordion>
          </Grid>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <RHFSubmitButton onClick={handleSubmit(onSubmit)}>
              {!isEdit ? 'Add' : 'Save Changes'}
            </RHFSubmitButton>
          </Stack>
        </Grid>
      </Card>
    </FormProvider>
  );
}
