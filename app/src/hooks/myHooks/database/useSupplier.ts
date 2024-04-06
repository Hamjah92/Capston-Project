import { NestCommonRes } from 'src/@types/https';
import { AddSupplierType, SupplierType } from 'src/@types/supplier';
import { useSnackbar } from 'src/components/snackbar';
import { Row } from '@tanstack/react-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePrivateApi } from '../usePrivateApi';


export const useSupplier = () => {
  const privateApi = usePrivateApi();
  const { enqueueSnackbar } = useSnackbar();



  const getAllSuppliers = async () => {
    try {
      const { data } = await privateApi.get('/supplier/all');
      return data as SupplierType[];
    } catch (error) {
      console.error("Failed to fetch Suppliers:", error);
      return [];
    }
  };


  const getSupplierById = async (supplierId: string) => {

    const { data } = await privateApi.get(`/supplier/${supplierId}`);
    return Promise.resolve(data);
  };

  const createSupplier = async (formData: AddSupplierType) => {
    const { data } = await privateApi.post('/supplier/create', formData);
    return Promise.resolve(data as NestCommonRes);
  };

  const deleteManySupplier = async (selectedFlatRows: Row<any>[]) => {
    const supplierIds = selectedFlatRows.map((row) => row.original.supplierId);
    const { data } = await privateApi.delete(`/supplier/deleteMany`, {
      data: { supplierIds },
    });
    return data;
  };

  const deleteSupplierByID = async (supplierId: string) => {

    const { data } = await privateApi.delete(`/supplier/delete/${supplierId}`);
    return data as NestCommonRes;
  };



  const queryClient = useQueryClient();
  const { mutateAsync: deleteMany } = useMutation({
    mutationFn: deleteManySupplier,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });

      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });


  const defaultSupplier = (supplier: AddSupplierType | undefined) => ({
    supplierName: supplier?.supplierName || '',
    supplierPhone: supplier?.supplierPhone || '',
    supplierEmail: supplier?.supplierEmail || '',
    supplierGST: supplier?.supplierGST || ''
  });

  const editSupplier = async (formData: AddSupplierType, supplierId: string) => {
    console.log("supplierID", supplierId);

    const { data } = await privateApi.put(`/supplier/edit/${supplierId}`, formData);
    return Promise.resolve(data);
  };

  const supplierQuery = useQuery({
    queryKey: ['suppliers'],
    queryFn: getAllSuppliers,
    initialData: [],
    refetchOnWindowFocus: false,
  });


  return {
    getAllSuppliers,
    createSupplier,
    deleteMany,
    defaultSupplier,
    editSupplier,
    deleteSupplierByID,
    getSupplierById,
    supplierQuery
  };
};
