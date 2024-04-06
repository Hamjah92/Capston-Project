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
  salesTax: yup.array().required().nullable(),
  purchaseTax: yup.array().required().nullable(),
  taxesInclusive: yup.boolean().required(),
  isFree: yup.boolean().required(),
});


// purchase

const purchaseDetailsSchema = yup.object().shape({
  // Assuming you have similar fields for purchaseDetails items
  productId: yup.mixed().required('Product ID is required.'),
  productQuantity: yup.number().min(1, 'Product quantity must be at least 1.').required('Product quantity is required.'),
  productPrice: yup.number().min(0, 'Product price cannot be negative.').required('Product price is required.'),
  taxInPer: yup.number().min(0, 'tax percentage cannot be negative.').required('tax is required.'),
  taxInAmount: yup.number().min(0, 'tax amount percentage cannot be negative.').optional(),
  productTotal: yup.number().min(0, 'Product total cannot be negative.').required('Product total is required.')
});

export const purchaseSchema = yup.object().shape({
  purchaseDate: yup.date().required('Purchase date is required.'),
  dueDate: yup.date().required('Due date is required.'),
  totalDiscountInPer: yup.number().min(0, 'Discount cannot be negative.').max(100, "Discount must be less 100").required('Discount amount is required.'),
  totalTaxInAmount: yup.number().min(0, 'tax amount cannot be negative.').required('tax amount is required.'),
  shippingCost: yup.number().min(0, 'Shipping cost cannot be negative.').required('Shipping cost is required.'),
  subTotal: yup.number().min(0, 'Subtotal cannot be negative.').required('Subtotal is required.'),
  netTotal: yup.number().min(0, 'Net total cannot be negative.').required('Net total is required.'),
  supplierId: yup.string().required('Supplier ID is required.'), // Adjust validation based on actual data type and requirements
  status: yup.string().required('status is required.'), // Adjust validation based on actual data type and requirements
  purchaseDetails: yup.array().of(purchaseDetailsSchema).required('Purchase details are required.')
});

// invoice

const invoiceDetailsSchema = yup.object().shape({
  // Assuming you have similar fields for invoiceDetails items
  productId: yup.mixed().required('Product ID is required.'),
  productQuantity: yup.number().min(1, 'Product quantity must be at least 1.').required('Product quantity is required.'),
  productPrice: yup.number().min(0, 'Product price cannot be negative.').required('Product price is required.'),
  taxInPer: yup.number().min(0, 'tax percentage cannot be negative.').required('tax is required.'),
  taxInAmount: yup.number().min(0, 'tax amount percentage cannot be negative.').optional(),
  productTotal: yup.number().min(0, 'Product total cannot be negative.').required('Product total is required.')
});

export const invoiceSchema = yup.object().shape({
  invoiceDate: yup.date().required('invoice date is required.'),
  dueDate: yup.date().required('Due date is required.'),
  totalDiscountInPer: yup.number().min(0, 'Discount cannot be negative.').max(100, "Discount must be less 100").required('Discount amount is required.'),
  totalTaxInAmount: yup.number().min(0, 'tax amount cannot be negative.').required('tax amount is required.'),
  shippingCost: yup.number().min(0, 'Shipping cost cannot be negative.').required('Shipping cost is required.'),
  subTotal: yup.number().min(0, 'Subtotal cannot be negative.').required('Subtotal is required.'),
  netTotal: yup.number().min(0, 'Net total cannot be negative.').required('Net total is required.'),
  customerId: yup.string().required('Customer ID is required.'), // Adjust validation based on actual data type and requirements
  status: yup.string().required('status is required.'), // Adjust validation based on actual data type and requirements
  invoiceDetails: yup.array().of(invoiceDetailsSchema).required('invoice details are required.')
});