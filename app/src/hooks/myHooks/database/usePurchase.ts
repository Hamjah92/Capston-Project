import { useSnackbar } from 'src/components/snackbar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { AddPurchaseType, PurchaseType } from 'src/@types/purchase';
import { usePrivateApi } from '../usePrivateApi';

export const usePurchase = () => {
  const privateApi = usePrivateApi();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const getAllPurchases = async () => {
    try {
      const { data } = await privateApi.get('/purchase/all');
      return data as PurchaseType[];
    } catch (error) {
      console.error("Failed to fetch Purchases:", error);
      return [];
    }
  };

  const purchaseQuery = useQuery({
    queryKey: ['purchases'],
    queryFn: getAllPurchases,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const getPurchaseById = async (purchaseId: string) => {
    const { data } = await privateApi.get(`/purchase/${purchaseId}`);
    return Promise.resolve(data);
  };

  const createPurchase = async (formData: AddPurchaseType) => {
    const { data } = await privateApi.post('/purchase/create', formData);
    return Promise.resolve(data); // Adjust the return type based on your backend response
  };

  const deletePurchaseById = async (id: number) => {
    const { data } = await privateApi.delete(`/purchase/delete/${id}`);
    return data; // Adjust the return type based on your backend response
  };

  const editPurchase = async (formData: AddPurchaseType, purchaseId: string) => {
    const { data } = await privateApi.put(`/purchase/edit/${purchaseId}`, formData);
    return Promise.resolve(data);
  };

  const { mutateAsync: deleteById } = useMutation({
    mutationFn: deletePurchaseById,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });

  const deleteManyPurchases = async (selectedFlatRows: Row<any>[]) => {
    const purchaseIds = selectedFlatRows.map((row) => row.original.id);
    console.log(purchaseIds);

    const { data } = await privateApi.delete(`/purchase/deleteMany`, {
      data: { purchaseIds },
    });
    return data;
  };

  const { mutateAsync: deleteMany } = useMutation({
    mutationFn: deleteManyPurchases,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });

      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });

  const defaultPurchase = (purchase?: AddPurchaseType): AddPurchaseType => ({
    purchaseDate: purchase?.purchaseDate || null,
    dueDate: purchase?.dueDate || null,
    totalDiscountInPer: purchase?.totalDiscountInPer || 0,
    status: purchase?.status || "",
    totalTaxInAmount: purchase?.totalTaxInAmount || 0,
    shippingCost: purchase?.shippingCost || 0,
    subTotal: purchase?.subTotal || 0,
    netTotal: purchase?.netTotal || 0,
    supplierId: purchase?.supplierId || "", // Defaulting to 1, adjust as necessary
    purchaseDetails: purchase?.purchaseDetails || []
  })


  return {
    getAllPurchases,
    createPurchase,
    deleteById,
    editPurchase,
    getPurchaseById,
    defaultPurchase,
    deleteMany,
    purchaseQuery
  };
};
