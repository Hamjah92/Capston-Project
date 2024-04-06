import { useSnackbar } from 'src/components/snackbar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { AddInvoiceType, InvoiceType } from 'src/@types/invoice';
import { usePrivateApi } from '../usePrivateApi';

export const useInvoice = () => {
  const privateApi = usePrivateApi();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const getAllInvoices = async () => {
    try {
      const { data } = await privateApi.get('/invoice/all');
      return data as InvoiceType[];
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      return [];
    }
  };

  const invoiceQuery = useQuery({
    queryKey: ['invoices'],
    queryFn: getAllInvoices,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const getInvoiceById = async (invoiceId: string) => {
    const { data } = await privateApi.get(`/invoice/${invoiceId}`);
    return Promise.resolve(data);
  };

  const createInvoice = async (formData: AddInvoiceType) => {
    const { data } = await privateApi.post('/invoice/create', formData);
    return Promise.resolve(data); // Adjust the return type based on your backend response
  };

  const deleteInvoiceById = async (id: number) => {
    const { data } = await privateApi.delete(`/invoice/delete/${id}`);
    return data; // Adjust the return type based on your backend response
  };

  const editInvoice = async (formData: AddInvoiceType, invoiceId: string) => {
    const { data } = await privateApi.put(`/invoice/edit/${invoiceId}`, formData);
    return Promise.resolve(data);
  };

  const { mutateAsync: deleteById } = useMutation({
    mutationFn: deleteInvoiceById,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const deleteManyInvoices = async (selectedFlatRows: Row<any>[]) => {
    const invoiceIds = selectedFlatRows.map((row) => row.original.id);

    const { data } = await privateApi.delete(`/invoice/deleteMany`, {
      data: { invoiceIds },
    });
    return data;
  };

  const { mutateAsync: deleteMany } = useMutation({
    mutationFn: deleteManyInvoices,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });

      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const defaultInvoice = (invoice?: AddInvoiceType): AddInvoiceType => ({
    invoiceDate: invoice?.invoiceDate || null,
    customerId: invoice?.customerId || "", // Defaulting to 1, adjust as necessary
    dueDate: invoice?.dueDate || null,
    totalDiscountInPer: invoice?.totalDiscountInPer || 0,
    status: invoice?.status || "",
    totalTaxInAmount: invoice?.totalTaxInAmount || 0,
    shippingCost: invoice?.shippingCost || 0,
    subTotal: invoice?.subTotal || 0,
    netTotal: invoice?.netTotal || 0,
    invoiceDetails: invoice?.invoiceDetails || []
  })


  return {
    getAllInvoices,
    createInvoice,
    deleteById,
    editInvoice,
    getInvoiceById,
    defaultInvoice,
    deleteMany,
    invoiceQuery
  };
};
