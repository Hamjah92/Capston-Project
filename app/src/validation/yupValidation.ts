import * as yup from 'yup';

const optionalString = yup.string().optional();
// const optionalSelect = yup.object().optional();

// customer
export const NewCustomerSchema = yup.object().shape({
  customerName: yup.string().required('Name is required'),
  customerEmail: yup.string().required('Email is required').email(),
  customerPhone: yup.string().required('Phone number is required').min(8, "Enter Number Properly"),
  customerBusinessName: optionalString,
  customerGST: optionalString,
  customerPAN: optionalString,
});

// supplier

export const NewSupplierSchema = yup.object().shape({
  supplierName: yup.string().required('Name is required'),
  supplierEmail: yup.string().required('Email is required').email(),
  supplierPhone: yup.string().required('Phone number is required').min(8, "Enter Number Properly"),
  supplierGST: optionalString,
});


//  address
export const NewAddressSchema = yup.object().shape({
  addressId: yup.string().required("Address Is is needed"),
  businessAddress: yup.string().required('Address is required'),
  pinCode: yup.string().required('Pin code is required'),
  addressType: yup.string(),
  isDefault: yup.boolean().default(false),
  state: yup.string().required(),
  city: yup.string().required('city is required'),
})


// tax

export const newTaxSlabSchema = yup.object().shape({
  taxName: yup.string().required("Tax Name Is Required"),
  taxRate: yup.string().required("Tax is Required"),
  taxType: yup.string().required("Tax type is Required"),
})

// product 
export const newProductSchema = yup.object().shape({
  productType: yup.string().required(),
  productName: yup.string().required(),
  productDescription: yup.string().required(),
  productCode: yup.string().required(),
  discount: yup.string().required(),
  discountIn: yup.object().required(),
  salesUnit: yup.object().required(),
  salesPrice: yup.string().required(),
  purchaseUnit: yup.object().required(),
  purchasePrice: yup.string().required(),
  openingQuantity: yup.number().min(0).required(),
  lowStockReminder: yup.number().min(0).required(),
  availableQuantity: yup.number().min(0).required(),
  tax: yup.string().required(),
  taxesInclusive: yup.boolean().required(),
  isFree: yup.boolean().required(),
});

