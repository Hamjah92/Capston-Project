import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Grid, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { NestCommonRes } from 'src/@types/https';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { RHFSubmitButton } from 'src/components/hook-form/RHFSubmitButton';
import { useSnackbar } from 'src/components/snackbar';
import { useTax } from 'src/hooks/myHooks/database/useTax';
import { useErrorFocus } from 'src/hooks/utilityHooks/useErrorFocus';
import { newTaxSlabSchema } from 'src/validation';

type Props = {
  isEdit: boolean;
  currentTax?: AddTaxType;
};

export const TaxForm = ({ isEdit, currentTax }: Props) => {
  const { defaultTax, createTaxSlab, editTaxSlab } = useTax();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { taxId } = useParams();

  const defaultValues: AddTaxType = useMemo(
    () => defaultTax(currentTax),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTax]
  );

  const methods = useForm<AddTaxType>({
    resolver: yupResolver<AddTaxType>(newTaxSlabSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = methods;

  useErrorFocus({ errors, setFocus });

  const onSubmit = async (data: any) => {
    try {
      let res: NestCommonRes;
      if (!isEdit) {
        res = await createTaxSlab(data);
      } else {
        res = await editTaxSlab(data, taxId!);
      }
      enqueueSnackbar(res!.message, { variant: res!.type });
      navigate('/dashboard/tax/list');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card sx={{ p: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <RHFTextField name="taxName" label="Tax Name" required />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="taxRate" label="Tax Rate" required />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="taxType" label="Text Type" />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mt: 3 }} gap={1}>
          <RHFSubmitButton onClick={handleSubmit(onSubmit)}>
            {!isEdit ? 'Add' : 'Save Changes'}
          </RHFSubmitButton>
          <Button color="primary" onClick={() => reset()}>
            Reset
          </Button>
        </Stack>
      </Card>
    </FormProvider>
  );
};
