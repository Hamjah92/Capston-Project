import { NestCommonRes } from "src/@types/https";
import { useSnackbar } from "src/components/snackbar";
import { Row } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePrivateApi } from "../usePrivateApi";


export const useTax = () => {
  const privateApi = usePrivateApi();

  const { enqueueSnackbar } = useSnackbar();


  const defaultTax = (tax: AddTaxType | undefined): AddTaxType => ({
    taxName: tax?.taxName || '',
    taxType: tax?.taxType || '',
    taxRate: tax?.taxRate || "",
  });

  const getAllTaxSlab = async () => {
    try {
      const { data } = await privateApi.get('/tax/all');
      return data as TaxType[];
    } catch (error) {
      console.error("Failed to fetch Tax Slab:", error);
      return [];
    }
  };

  const getTaxById = async (id: string) => {

    const { data } = await privateApi.get(`/tax/${id}`);
    return Promise.resolve(data);
  };

  const createTaxSlab = async (formData: TaxType) => {
    const { data } = await privateApi.post('/tax/create', formData);
    return Promise.resolve(data as NestCommonRes);
  };

  const editTaxSlab = async (formData: AddTaxType, taxId: string) => {
    const { data } = await privateApi.put(`/tax/edit/${taxId}`, formData);
    return Promise.resolve(data);
  };


  const deleteManyTax = async (selectedFlatRows: Row<any>[]) => {
    const taxIds = selectedFlatRows.map((row) => row.original.id);
    const { data } = await privateApi.delete(`/tax/deleteMany`, {
      data: { taxIds },
    });
    return data;
  };

  const deleteTaxByID = async (taxId: number) => {
    console.log(taxId);

    const { data } = await privateApi.delete(`/tax/delete/${taxId}`);
    return data as NestCommonRes;
  };


  const queryClient = useQueryClient();

  const { mutateAsync: delTax } = useMutation({
    mutationFn: deleteTaxByID,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type ?? 'info' });
      queryClient.invalidateQueries({ queryKey: ['taxes'] });
    },
  });


  const { mutateAsync: deleteMany } = useMutation({
    mutationFn: deleteManyTax,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });

      queryClient.invalidateQueries({ queryKey: ["taxes"] });
    },
  });

  const taxQuery = useQuery({
    queryKey: ['taxes'],
    queryFn: getAllTaxSlab,
    initialData: [],
    refetchOnWindowFocus: false,
  });


  return { defaultTax, createTaxSlab, getAllTaxSlab, editTaxSlab, delTax, deleteMany, getTaxById, taxQuery }
}