export type Address = {
  addressId: string;
  addressType: 'Billing' | 'Shipping';
  customerId: string;
  businessAddress: string;
  state: {
    stateName: string;
    stateCode: string;
  };
  pinCode: string;
  city: string;
  isDefault: boolean;
};
