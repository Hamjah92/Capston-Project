type TaxType = {
  id: number
  taxName: string,
  taxRate: string
  taxType: string,
}

type AddTaxType = Omit<TaxType, "id">

