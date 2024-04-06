export type SupplierType = {
  id?: number;
  supplierId: string;
  supplierName: string;
  supplierPhone: string;
  supplierEmail: string;
  supplierGST: string;
};

export type AddSupplierType = {
  supplierName: string;
  supplierPhone: string;
  supplierEmail: string;
  supplierGST?: string;
};
