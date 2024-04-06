import { NestCommonRes } from 'src/@types/https';
import { useSnackbar } from 'src/components/snackbar';
import { Row } from '@tanstack/react-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AddProductType, ProductType } from 'src/@types/product';
import { usePrivateApi } from '../usePrivateApi';


export const useProduct = () => {
  const privateApi = usePrivateApi();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();



  const getAllProducts = async () => {
    try {
      const { data } = await privateApi.get('/product/all');
      return data as ProductType[];
    } catch (error) {
      console.error("Failed to fetch Products:", error);
      return [];
    }
  };


  const getProductById = async (ProductId: string) => {

    const { data } = await privateApi.get(`/product/${ProductId}`);
    return Promise.resolve(data);
  };

  const createProduct = async (formData: AddProductType) => {
    const { data } = await privateApi.post('/product/create', formData);
    return Promise.resolve(data as NestCommonRes);
  };

  const deleteManyProduct = async (selectedFlatRows: Row<any>[]) => {

    const productIds = selectedFlatRows.map((row) => row.original.productId);
    const { data } = await privateApi.delete(`/product/deleteMany`, {
      data: { productIds },
    });
    return data;
  };

  const deleteProductByID = async (ProductId: string) => {

    const { data } = await privateApi.delete(`/product/delete/${ProductId}`);
    return data as NestCommonRes;
  };



  const { mutateAsync: deleteMany } = useMutation({
    mutationFn: deleteManyProduct,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const { mutateAsync: deleteById } = useMutation({
    mutationFn: deleteProductByID,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });


  const defaultProduct = (product: AddProductType | undefined): AddProductType => {
    const discountIn = product?.discountIn === "percentage" ? { name: "%", value: "%" } : { name: "fix", value: "fix" };
    const salesUnit = product?.salesUnit ? { name: product?.salesUnit, value: product?.salesUnit } : null;
    const purchaseUnit = product?.purchaseUnit ? { name: product?.purchaseUnit, value: product?.purchaseUnit } : null;
    return {
      productType: product?.productType || 'GOODS', // Default to "GOODS" if not specified
      productName: product?.productName || "",
      productDescription: product?.productDescription || "",
      productCode: product?.productCode || "",
      discount: product?.discount || "", // Assuming a default of "0" for no discount
      discountIn: discountIn || null, // Default to "percentage" if not specified
      salesUnit,
      salesPrice: product?.salesPrice || "", // Assuming a default price of "0"
      purchaseUnit,
      purchasePrice: product?.purchasePrice || "", // Assuming a default price of "0"
      openingQuantity: product?.openingQuantity || 0,
      lowStockReminder: product?.lowStockReminder || 0,
      availableQuantity: product?.availableQuantity || 0,
      salesTax: product?.salesTax || null, // Assuming a default tax of "0"
      purchaseTax: product?.purchaseTax || null, // Assuming a default tax of "0"
      taxesInclusive: product?.taxesInclusive || false,
      isFree: product?.isFree || false,
    }
  };

  const editProduct = async (formData: AddProductType, ProductId: string) => {
    const { data } = await privateApi.put(`/product/edit/${ProductId}`, formData);
    return Promise.resolve(data);
  };

  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  return {
    getAllProducts,
    createProduct,
    deleteMany,
    defaultProduct,
    editProduct,
    deleteById,
    getProductById,
    productQuery
  };
};
