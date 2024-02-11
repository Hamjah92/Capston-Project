import { generateId } from "src/utils/uuidv4"
import { usePrivateApi } from "../usePrivateApi"
import { Address, AddressType } from "src/@types/address"


type PinDataRes = {
  city: string,
  state: { stateName: string, stateCode: string }
}
export const useGeneral = () => {
  const privateApi = usePrivateApi()

  const getInitialAddress = (address: Address | null, addressType: AddressType) => ({
    addressId: address?.addressId || generateId(),
    addressType: addressType,
    businessAddress: address?.businessAddress || '',
    isDefault: address?.isDefault || false,
    pinCode: address?.pinCode || '',
    city: address?.city || '',
    state: "",
  });

  return { getInitialAddress }
}
