type TaxType = {
  taxId: string
  taxName: string,
  taxRate: string
  taxType: string,
}

type AddTaxType = Omit<TaxType, "taxId">

