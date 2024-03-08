import { NestCommonRes } from "src/@types/https";
import { useSnackbar } from "src/components/snackbar";
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

  const createTaxSlab = async (formData: TaxType) => {
    const { data } = await privateApi.post('/tax/create', formData);
    return Promise.resolve(data as NestCommonRes);
  };

  const editTaxSlab = async (formData: AddTaxType, taxId: string) => {
    const { data } = await privateApi.put(`/tax/edit/${taxId}`, formData);
    return Promise.resolve(data);
  };


  return { defaultTax, createTaxSlab, getAllTaxSlab, editTaxSlab }
}