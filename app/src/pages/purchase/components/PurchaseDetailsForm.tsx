import { useCallback, useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  InputAdornment,
  inputBaseClasses,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import { useProduct } from 'src/hooks/myHooks/database/useProduct'; // Make sure the import path is correct
import { PurchaseDetailsType } from 'src/@types/purchase';
import { fCurrency } from 'src/utils/format-number';
import { RHFAutoCompleteObject } from 'src/components/hook-form/RHFAutoCompleteObject';
import { ProductType } from 'src/@types/product';

type props = {
  isEdit?: boolean;
};
export function PurchaseNewEditDetails({ isEdit }: props) {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'purchaseDetails',
  });

  const { data: products, isLoading } = useProduct().productQuery; // Adjust based on your useProduct hook implementation

  const values = watch();

  const subtotal = values.purchaseDetails.reduce(
    (acc: any, detail: PurchaseDetailsType) => acc + detail.productQuantity * detail.productPrice,
    0
  );

  const totalTax = values.purchaseDetails.reduce(
    (acc: any, detail: PurchaseDetailsType) =>
      acc + ((detail.taxInPer * detail.productPrice * detail.productQuantity) / 100 || 0),
    0
  );

  const totalDiscountInAmount = (subtotal * values.totalDiscountInPer) / 100;

  const totalAmount = subtotal + parseFloat(values.shippingCost) + totalTax - totalDiscountInAmount;

  useEffect(() => {
    setValue('netTotal', totalAmount);
    setValue('subTotal', subtotal);
    setValue('totalTaxInAmount', totalTax);
  }, [setValue, subtotal, totalTax, totalDiscountInAmount, values.shippingCost, totalAmount]);

  const handleAddDetail = useCallback(() => {
    append({
      productId: '',
      productQuantity: 1,
      productPrice: 0,
      discountOnItem: 0,
      taxInPer: 0,
      productTotal: 0,
    });
  }, [append]);
  useEffect(() => {
    if (!isEdit) handleAddDetail();
  }, [isEdit, handleAddDetail]);

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subtotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Shipping</Box>
        <Box
          sx={{
            width: 160,
            ...(values.shippingCost && { color: 'error.main' }),
          }}
        >
          {values.shippingCost ? `+ ${fCurrency(values.shippingCost)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Discount</Box>
        <Box
          sx={{
            width: 160,
            ...(totalDiscountInAmount && { color: 'success.main' }),
          }}
        >
          {totalDiscountInAmount ? `- ${fCurrency(totalDiscountInAmount)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Taxes</Box>
        <Box sx={{ width: 160 }}>{totalTax ? fCurrency(totalTax) : '-'}</Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <Box>Total</Box>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  const handleRemoveDetail = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleSelectProduct = useCallback(
    (index: number, product: ProductType) => {
      if (!product) return;

      const newPrice = parseFloat(product.purchasePrice);
      const quantity = values.purchaseDetails[index]?.productQuantity || 1;

      const taxes = JSON.parse(product.purchaseTax as string) as TaxType[];
      const rate = taxes[0].taxRate;

      setValue(`purchaseDetails[${index}].productPrice`, newPrice);
      setValue(`purchaseDetails[${index}].taxInPer`, rate);
      setValue(`purchaseDetails[${index}].productTotal`, newPrice * quantity);
    },
    [setValue, values.purchaseDetails]
  );

  const handleChangeQuantity = useCallback(
    (index: number, quantity: number) => {
      const price = values.purchaseDetails[index]?.productPrice || 0;

      setValue(`purchaseDetails[${index}].productQuantity`, quantity);
      setValue(`purchaseDetails[${index}].productTotal`, price * quantity);
    },
    [setValue, values.purchaseDetails]
  );

  const handleChangePrice = useCallback(
    (index: number, price: number) => {
      const quantity = values.purchaseDetails[index]?.productQuantity || 1;

      setValue(`purchaseDetails[${index}].productPrice`, price);
      setValue(`purchaseDetails[${index}].productTotal`, price * quantity);
    },
    [setValue, values.purchaseDetails]
  );

  if (isLoading) return <Typography>Loading products...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((field, index) => (
          <Stack key={field.id} direction="row" alignItems="flex-end" spacing={2}>
            {/* Product Selection */}
            <RHFAutoCompleteObject
              name={`purchaseDetails[${index}].productId`}
              label="Product"
              options={products}
              size="small"
              optionLabel="productName"
              onchangeFn={(event, value) => handleSelectProduct(index, value)}
            />

            {/* Quantity Input */}
            <RHFTextField
              size="small"
              name={`purchaseDetails[${index}].productQuantity`}
              label="Quantity"
              type="number"
              onChange={(e) => handleChangeQuantity(index, parseInt(e.target.value, 10))}
            />

            {/* Price Input */}
            <RHFTextField
              size="small"
              name={`purchaseDetails[${index}].productPrice`}
              label="Price"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              onChange={(e) => handleChangePrice(index, parseFloat(e.target.value))}
              sx={{
                maxWidth: { md: 104 },
                [`& .${inputBaseClasses.input}`]: {
                  textAlign: { md: 'right' },
                },
              }}
            />
            <RHFTextField
              size="small"
              name={`purchaseDetails[${index}].taxInPer`}
              disabled
              label="Tax"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              sx={{
                maxWidth: { md: 104 },
                [`& .${inputBaseClasses.input}`]: {
                  textAlign: { md: 'right' },
                },
              }}
            />

            <RHFTextField
              disabled
              size="small"
              type="number"
              name={`purchaseDetails[${index}].productTotal`}
              label="Total"
              placeholder="0.00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: { md: 104 },
                [`& .${inputBaseClasses.input}`]: {
                  textAlign: { md: 'right' },
                },
              }}
            />

            <Button
              size="small"
              color="error"
              onClick={() => handleRemoveDetail(index)}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAddDetail}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>

        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
        >
          <RHFTextField
            size="small"
            label="Shipping($)"
            name="shippingCost"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
          />

          <RHFTextField
            size="small"
            label="Discount(%)"
            name="totalDiscountInPer"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
          />
        </Stack>
      </Stack>
      {/* Summary Section */}
      {renderTotal}
    </Box>
  );
}
