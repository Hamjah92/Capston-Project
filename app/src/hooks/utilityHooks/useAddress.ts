import { useState } from "react"
import { Address, AddressType } from '../../@types/address';
import { usePrivateApi } from "../myHooks/usePrivateApi";


export const useAddress = (initialAddresses = [] as Address[], addressType?: AddressType) => {
  const [addresses, setAddresses] = useState(initialAddresses)
  const privateApi = usePrivateApi();


  const addAddress = (address: Address) => {
    if (addresses.length === 0) {
      address.isDefault = true;
    }
    setAddresses([...addresses, address])
  }

  const removeAddress = (addressId: string) => {
    setAddresses(addresses.filter(item => item.addressId !== addressId))
  }


  const editAddress = (address: Address) => {
    const editableAddress = addresses.map(item => item.addressId === address.addressId ? address : item)
    setAddresses(editableAddress)
  }

  const changeDefaultAddress = (addressId: string) => {
    setAddresses(addresses.map(item => {
      item.isDefault = item.addressId === addressId
      return item
    }))
  }

  const resetAddresses = () => setAddresses([])

  const getAddressById = (addressId: string) => addresses.find(item => item.addressId === addressId)

  const getAddressByCustomerId = async (customerId: string) => {

    const { data } = await privateApi.get(`/address/${customerId}`);
    return Promise.resolve(data);
  };

  return { addAddress, addresses, removeAddress, editAddress, changeDefaultAddress, getAddressById, resetAddresses, setAddresses, addressType, getAddressByCustomerId };
}