import { useMemo } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Card, Grid, Stack, Theme, createStyles } from '@mui/material';
// components
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useCustomer } from 'src/hooks/myHooks/database/useCustomer';
import { NewCustomerSchema } from 'src/validation';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

import { ButtonAccordion } from 'src/my-components/common/button/ButtonAccordion';

import { RHFSubmitButton } from 'src/components/hook-form/RHFSubmitButton';
import {
  FormProvider,
  RHFSelect,
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
};

export default function CustomerForm({ isEdit, currentCustomer }: Props) {
  const { defaultCustomer, createCustomer } = useCustomer();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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
    formState: { errors },
  } = methods;

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [isEdit, currentCustomer]);

  const onSubmit = async (data: CustForm) => {
    const FormData: CustomerWithAddress = { ...data, addresses: [...BillingAddresses.addresses] };
    try {
      const res = await createCustomer(FormData);
      enqueueSnackbar(res.message, { variant: res.type });
      navigate('/dashboard/customer/list');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

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
            <RHFTextField name="tradeName" label="Trade Name" required />
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
          <Grid item xs={12} md={6}>
            <RHFSelect name="customerCategory" label="Customer Category" required>
              {['', 'abdkj', 'ksdjnfkj'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFSelect name="country" label="Country" required>
              {['', 'Canada', 'India'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFSelect name="state" label="State" required>
              {['', 'Saskatchewan', 'Ontario'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </RHFSelect>
          </Grid>

          <Grid item xs={12}>
            <ButtonAccordion title="Address" sx={boxGridSx}>
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
