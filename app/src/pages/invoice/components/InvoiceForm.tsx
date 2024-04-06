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
// components
//
import { useNavigate, useParams } from 'react-router';
import { FormProvider } from 'src/components/hook-form';
import { AddInvoiceType } from 'src/@types/invoice';
import { useSnackbar } from 'src/components/snackbar';
import { useErrorFocus } from 'src/hooks/utilityHooks/useErrorFocus';
import { useQueryClient } from '@tanstack/react-query';
import { NestCommonRes } from 'src/@types/https';
import { invoiceSchema } from 'src/validation';
import { useInvoice } from 'src/hooks/myHooks/database/useInvoice';

import InvoiceDate from './InvoiceDate';
import { InvoiceDetailsForm } from './InvoiceDetailsForm';

// ----------------------------------------------------------------------

type Props = {
  currentInvoice?: AddInvoiceType;
  isEdit?: boolean;
};

export function InvoiceForm({ currentInvoice, isEdit }: Props) {
  const queryClient = useQueryClient();
  const { defaultInvoice, createInvoice, editInvoice } = useInvoice();
  const { invoiceId } = useParams();

  const defaultValues: AddInvoiceType = useMemo(() => {
    // Assuming `defaultInvoice` properly handles most fields,
    // but here we explicitly ensure invoiceDetails and date fields are correctly formatted.
    const formattedInvoice = defaultInvoice(currentInvoice);

    // Convert date strings to Date objects for DatePicker
    formattedInvoice.invoiceDate = currentInvoice?.invoiceDate
      ? new Date(currentInvoice.invoiceDate)
      : null;
    formattedInvoice.dueDate = currentInvoice?.dueDate ? new Date(currentInvoice.dueDate) : null;

    return formattedInvoice;
  }, [currentInvoice, defaultInvoice]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loadingSend = useBoolean();

  const methods = useForm<AddInvoiceType>({
    resolver: yupResolver<AddInvoiceType>(invoiceSchema),
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
        res = await createInvoice(data);
      } else {
        res = await editInvoice(data, invoiceId!);
        queryClient.invalidateQueries({ queryKey: [`invoice/${invoiceId}`] });
      }
      enqueueSnackbar(res!.message, { variant: res!.type });
      reset();
      loadingSend.onFalse();
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      navigate(paths.dashboard.invoice.root);
    } catch (error) {
      console.error(error);
      loadingSend.onFalse();
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceDate />
        <InvoiceDetailsForm isEdit={isEdit} />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          onClick={handleCreateAndSend}
        >
          {currentInvoice ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
