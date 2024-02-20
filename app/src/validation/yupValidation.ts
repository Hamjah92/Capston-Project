import * as Yup from 'yup';

const optionalString = Yup.string().optional();

export const NewCustomerSchema = Yup.object().shape({
  customerName: Yup.string().required('Name is required'),
  customerEmail: Yup.string().required('Email is required').email(),
  customerPhone: Yup.string().required('Phone number is required').min(8, "Enter Number Properly"),
  customerBusinessName: optionalString,
  customerGST: optionalString,
  customerPAN: optionalString,
});

// 

export const NewSupplierSchema = Yup.object().shape({
  supplierName: Yup.string().required('Name is required'),
  supplierEmail: Yup.string().required('Email is required').email(),
  supplierPhone: Yup.string().required('Phone number is required').min(8, "Enter Number Properly"),
  supplierGST: optionalString,
});


// 
export const NewAddressSchema = Yup.object().shape({
  addressId: Yup.string().required("Address Is is needed"),
  businessAddress: Yup.string().required('Address is required'),
  pinCode: Yup.string().required('Pin code is required'),
  addressType: Yup.string(),
  isDefault: Yup.boolean().default(false),
  state: Yup.string().required(),
  city: Yup.string().required('city is required'),
}) 
