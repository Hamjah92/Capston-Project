
export type PurchaseType = {
  purchaseId: string;
  purchaseDate: Date | null;
  dueDate: Date | null;
  totalDiscountInPer: number;
  totalTaxInAmount: number;
  status: string
  shippingCost: number;
  subTotal: number;
  netTotal: number;
  supplierId: string;
}

export type AddPurchaseType = Omit<PurchaseType, "purchaseId"> & {
  purchaseDetails: AddPurchaseDetailsType[]
}
export type GetPurchaseType = Omit<PurchaseType, "purchaseNumber"> & {
  id: number;
  purchaseDetails: AddPurchaseDetailsType[]
}

export type PurchaseDetailsType = {
  purchaseDetailsId: string;
  purchaseId: string;
  productId: any;
  productQuantity: number;
  productPrice: number;
  taxInPer: number;
  productTotal: number;
};

export type AddPurchaseDetailsType = Omit<PurchaseDetailsType, "purchaseDetailsId" | "purchaseId">
