

export type ProductType = {

  productId: string;

  productType: string | null;
  productName: string;
  productDescription: string;
  productCode: string
  discount: string
  discountIn: object | string | null
  salesUnit: object | null;
  salesPrice: string;
  purchaseUnit: object | null;
  purchasePrice: string;

  openingQuantity: number
  lowStockReminder: number
  availableQuantity: number

  salesTax: any[] | string | null
  purchaseTax: any[] | string | null

  taxesInclusive: boolean
  isFree: boolean
}

export type AddProductType = Omit<ProductType, "productId">