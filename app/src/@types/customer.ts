import { Address } from './address';

export type Customer = {
  id: number;
  customerId: string;
  customerCategory: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp: string;
  customerBusinessName?: string;
  customerEmail: string;
  customerGST?: string;
  customerPAN?: string;
  country: string;
  state: string;
  status: boolean;
};

export type CustForm = Omit<Customer, 'id' | 'customerId' | 'status' | "customerCategory" | "customerId" | "customerWhatsapp">;

export interface CustomerWithAddress extends CustForm {
  addresses: Address[];
}
