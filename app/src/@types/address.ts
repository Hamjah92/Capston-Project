export type AddressType = "Billing" | "Shipping" | undefined;
export interface Address {
  addressId: string;
  isDefault: boolean;
  addressType: AddressType,
  businessAddress: string;
  city: string;
  state: string;
  pinCode: string;
}