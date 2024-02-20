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
import { useSupplier } from 'src/hooks/myHooks/database/useSupplier';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

import { RHFSubmitButton } from 'src/components/hook-form/RHFSubmitButton';
import { NestCommonRes } from 'src/@types/https';

import { AddSupplierType } from 'src/@types/supplier';
import { NewSupplierSchema } from 'src/validation';

import {
  FormProvider,
  RHFTextField,
  RHFPhoneNumber,
  RHFTextFieldWithIcon,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
  currentSupplier?: AddSupplierType;
};

export default function SupplierForm({ isEdit, currentSupplier }: Props) {
  const { defaultSupplier, createSupplier, editSupplier } = useSupplier();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { supplierId } = useParams();

  const defaultValues: AddSupplierType = useMemo(
    () => defaultSupplier(currentSupplier),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSupplier]
  );

  const methods = useForm<AddSupplierType>({
    resolver: yupResolver<AddSupplierType>(NewSupplierSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = methods;

  useErrorFocus({ errors, setFocus });

  console.log(errors);

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit, defaultValues, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      let res: NestCommonRes;
      if (!isEdit) {
        res = await createSupplier(data);
      } else {
        res = await editSupplier(data, supplierId!);
      }
      enqueueSnackbar(res!.message, { variant: res!.type });
      navigate('/dashboard/Supplier/list');
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
              name="supplierGST"
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

          <Grid item xs={12} md={4}>
            <RHFTextField name="supplierName" label="Supplier Name" required />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFPhoneNumber name="supplierPhone" label="Phone" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="supplierEmail" label="Email Address" required />
          </Grid>
        </Grid>
        <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
          <RHFSubmitButton onClick={handleSubmit(onSubmit)}>
            {!isEdit ? 'Add' : 'Save Changes'}
          </RHFSubmitButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
