import { NestCommonRes } from 'src/@types/https';
import { useSnackbar } from 'src/components/snackbar';
import { Row } from '@tanstack/react-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddProductType, ProductType } from 'src/@types/product';
import { usePrivateApi } from '../usePrivateApi';


export const useProduct = () => {
  const privateApi = usePrivateApi();
  const { enqueueSnackbar } = useSnackbar();



  const getAllProducts = async () => {
    try {
      const { data } = await privateApi.get('/Product/all');
      return data as ProductType[];
    } catch (error) {
      console.error("Failed to fetch Products:", error);
      return [];
    }
  };


  const getProductById = async (ProductId: string) => {

    const { data } = await privateApi.get(`/Product/${ProductId}`);
    return Promise.resolve(data);
  };

  const createProduct = async (formData: AddProductType) => {
    const { data } = await privateApi.post('/Product/create', formData);
    return Promise.resolve(data as NestCommonRes);
  };

  const deleteManyProduct = async (selectedFlatRows: Row<any>[]) => {
    const ProductIds = selectedFlatRows.map((row) => row.original.ProductId);
    const { data } = await privateApi.delete(`/Product/deleteMany`, {
      data: { ProductIds },
    });
    return data;
  };

  const deleteProductByID = async (ProductId: string) => {

    const { data } = await privateApi.delete(`/Product/delete/${ProductId}`);
    return data as NestCommonRes;
  };



  const queryClient = useQueryClient();
  const { mutateAsync: deleteMany } = useMutation({
    mutationFn: deleteManyProduct,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });

      queryClient.invalidateQueries({ queryKey: ["Products"] });
    },
  });


  const defaultProduct = (product: AddProductType | undefined): AddProductType => ({
    productType: product?.productType || 'GOODS', // Default to "GOODS" if not specified
    productName: product?.productName || "",
    productDescription: product?.productDescription || "",
    productCode: product?.productCode || "",
    discount: product?.discount || "", // Assuming a default of "0" for no discount
    discountIn: product?.discountIn || null, // Default to "percentage" if not specified
    salesUnit: product?.salesUnit || null,
    salesPrice: product?.salesPrice || "", // Assuming a default price of "0"
    purchaseUnit: product?.purchaseUnit || null,
    purchasePrice: product?.purchasePrice || "", // Assuming a default price of "0"
    openingQuantity: product?.openingQuantity || 0,
    lowStockReminder: product?.lowStockReminder || 0,
    availableQuantity: product?.availableQuantity || 0,
    tax: product?.tax || "", // Assuming a default tax of "0"
    taxesInclusive: product?.taxesInclusive || false,
    isFree: product?.isFree || false,
  });

  const editProduct = async (formData: AddProductType, ProductId: string) => {
    console.log("ProductID", ProductId);

    const { data } = await privateApi.put(`/Product/edit/${ProductId}`, formData);
    return Promise.resolve(data);
  };



  return {
    getAllProducts,
    createProduct,
    deleteMany,
    defaultProduct,
    editProduct,
    deleteProductByID,
    getProductById
  };
};
