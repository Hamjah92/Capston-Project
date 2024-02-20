import { Row } from '@tanstack/react-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CustForm, Customer, CustomerWithAddress } from 'src/@types/customer';
import { NestCommonRes } from 'src/@types/https';
import { useSnackbar } from 'src/components/snackbar';
import { usePrivateApi } from '../usePrivateApi';


export const useCustomer = () => {
  const privateApi = usePrivateApi();
  const { enqueueSnackbar } = useSnackbar();

  const getAllCustomers = async () => {
    try {
      const { data } = await privateApi.get('/customer/all');
      return data as Customer[];
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      return [];
    }
  };

  const createCustomer = async (formData: CustomerWithAddress) => {
    const { data } = await privateApi.post('/customer/create', formData);
    return Promise.resolve(data as NestCommonRes);
  };
  const editCustomer = async (formData: CustomerWithAddress, customerId: string) => {
    const { data } = await privateApi.put(`/customer/edit/${customerId}`, formData);
    return Promise.resolve(data);
  };

  const getCustomerById = async (customerId: string) => {
    const { data } = await privateApi.get(`/customer/${customerId}`);
    return Promise.resolve(data);
  };

  const deleteCustomerByID = async (customerId: string) => {

    const { data } = await privateApi.delete(`/customer/delete/${customerId}`);
    return data as NestCommonRes;
  };

  const deleteManyCustomers = async (selectedFlatRows: Row<any>[]) => {
    const customerIds = selectedFlatRows.map((row) => row.original.customerId);
    const { data } = await privateApi.delete(`/customer/deleteMany`, {
      data: { customerIds },
    });
    return data;
  };

  const defaultCustomer = (customer: CustForm | undefined) => ({
    customerName: customer?.customerName || '',
    customerPhone: customer?.customerPhone || '',
    customerEmail: customer?.customerEmail || '',
    // customerCategory: customer?.customerCategory || '',
    // customerWhatsapp: customer?.customerWhatsapp || '',
    customerBusinessName: customer?.customerBusinessName || '',
    customerGST: customer?.customerGST || '',
    customerPAN: customer?.customerPAN || '',
  });

  const queryClient = useQueryClient();
  const { mutateAsync: deleteMany } = useMutation({
    mutationFn: deleteManyCustomers,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });

      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return {
    getAllCustomers,
    createCustomer,
    editCustomer,
    getCustomerById,
    defaultCustomer,
    deleteCustomerByID,
    deleteMany,
  };
};
