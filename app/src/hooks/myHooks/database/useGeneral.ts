import { STATE_DATA } from "src/_mock/data/_stateData"
import { generateId } from "src/utils/uuidv4"
import { Address, AddressType } from "src/@types/address"
import { usePrivateApi } from "../usePrivateApi"


type PinDataRes = {
  city: string,
  state: { stateName: string, stateCode: string }
}
export const useGeneral = () => {
  const privateApi = usePrivateApi()

  const getState = async () => {
    if (STATE_DATA) return STATE_DATA
    const { data } = await privateApi.get("region/state/all");
    return data;
  }

  const getPinData = async (pinCode: string) => {
    if (pinCode.length !== 6) return []
    const { data } = await privateApi.get(`region/pinData/${pinCode}`);
    return data as PinDataRes;
  }

  const getUnit = async () => {
    const { data } = await privateApi.get("general/units");
    return data
  }

  const getHsn = async (filter: string) => {
    if (!filter) return []
    const { data } = await privateApi.get(`general/hsn`, {
      params: { filter }
    });
    return data
  }
  const getGSTChapter = async () => {
    const { data } = await privateApi.get(`general/getChapters`);
    return data
  }

  const getInitialAddress = (address: Address | null, addressType: AddressType) => ({
    addressId: address?.addressId || generateId(),
    addressType,
    businessAddress: address?.businessAddress || '',
    isDefault: address?.isDefault || false,
    pinCode: address?.pinCode || '',
    city: address?.city || '',
    state: address?.state || '',
  });

  return { getState, getPinData, getUnit, getHsn, getGSTChapter, getInitialAddress }
}
