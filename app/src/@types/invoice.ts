
export type InvoiceType = {
  invoiceId: string;
  customerId: string;
  invoiceDate: Date | null;
  dueDate: Date | null;
  totalDiscountInPer: number;
  totalTaxInAmount: number;
  status: string
  shippingCost: number;
  subTotal: number;
  netTotal: number;
}

export type AddInvoiceType = Omit<InvoiceType, "invoiceId"> & {
  invoiceDetails: AddInvoiceDetailsType[]
}
export type GetInvoiceType = Omit<InvoiceType, "invoiceNumber"> & {
  id: number;
  invoiceDetails: AddInvoiceDetailsType[]
}

export type InvoiceDetailsType = {
  invoiceDetailsId: string;
  invoiceId: string;
  productId: any;
  productQuantity: number;
  productPrice: number;
  taxInPer: number;
  productTotal: number;
};

export type AddInvoiceDetailsType = Omit<InvoiceDetailsType, "invoiceDetailsId" | "invoiceId">
