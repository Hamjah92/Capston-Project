import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// routes
import { paths } from 'src/routes/paths';
// types
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { usePurchase } from 'src/hooks/myHooks/database/usePurchase';
// components
//
import { useNavigate, useParams } from 'react-router';
import { FormProvider } from 'src/components/hook-form';
import { purchaseSchema } from 'src/validation';
import { AddPurchaseType } from 'src/@types/purchase';
import { useSnackbar } from 'src/components/snackbar';
import { useErrorFocus } from 'src/hooks/utilityHooks/useErrorFocus';
import { useQueryClient } from '@tanstack/react-query';
import { NestCommonRes } from 'src/@types/https';
import { PurchaseDate } from './PurchaseDate';
import { PurchaseNewEditDetails } from './PurchaseDetailsForm';

// ----------------------------------------------------------------------

type Props = {
  currentPurchase?: AddPurchaseType;
  isEdit?: boolean;
};

export function PurchaseForm({ currentPurchase, isEdit }: Props) {
  const queryClient = useQueryClient();
  const { defaultPurchase, createPurchase, editPurchase } = usePurchase();
  const { purchaseId } = useParams();

  const defaultValues: AddPurchaseType = useMemo(() => {
    // Assuming `defaultPurchase` properly handles most fields,
    // but here we explicitly ensure purchaseDetails and date fields are correctly formatted.
    const formattedPurchase = defaultPurchase(currentPurchase);

    // Convert date strings to Date objects for DatePicker
    formattedPurchase.purchaseDate = currentPurchase?.purchaseDate
      ? new Date(currentPurchase.purchaseDate)
      : null;
    formattedPurchase.dueDate = currentPurchase?.dueDate ? new Date(currentPurchase.dueDate) : null;

    return formattedPurchase;
  }, [currentPurchase, defaultPurchase]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loadingSend = useBoolean();

  const methods = useForm<AddPurchaseType>({
    resolver: yupResolver<AddPurchaseType>(purchaseSchema),
    defaultValues,
  });

  const {
    reset,
    setFocus,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useErrorFocus({ errors, setFocus });

  const handleCreateAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();
    try {
      console.info('DATA', JSON.stringify(data, null, 2));

      let res: NestCommonRes;
      if (!isEdit) {
        res = await createPurchase(data);
      } else {
        res = await editPurchase(data, purchaseId!);
        queryClient.invalidateQueries({ queryKey: [`purchase/${purchaseId}`] });
      }
      enqueueSnackbar(res!.message, { variant: res!.type });
      reset();
      loadingSend.onFalse();
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      navigate(paths.dashboard.purchase.root);
    } catch (error) {
      console.error(error);
      loadingSend.onFalse();
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods}>
      <Card>
        <PurchaseDate />
        <PurchaseNewEditDetails isEdit={isEdit} />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          onClick={handleCreateAndSend}
        >
          {currentPurchase ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
