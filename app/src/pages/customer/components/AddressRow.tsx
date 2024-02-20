import { FC, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { Radio, Stack, SxProps, Typography, IconButton, Button, Box } from '@mui/material';
import { AnimatedDottedBox } from 'src/my-components/common/AnimatedBox/AnimatedDottedBox';
import { RenderIf } from 'src/my-components/common/RenderIf';
import { Address, AddressType } from '../../../@types/address';

import { AddressModal } from './AddressModal';

type Props = {
  title: string;
  addressesObject: {
    addAddress: (address: Address) => void;
    addresses: Address[];
    removeAddress: (address_id: string) => void;
    editAddress: (address: Address) => void;
    changeDefaultAddress: (address_id: string) => void;
    getAddressById: (address_id: string) => Address | undefined;
    addressType: AddressType;
  };
};

export const AddressRow: FC<Props> = ({ addressesObject, title }) => {
  const theme = useTheme();
  const [addressForEdit, setAddressForEdit] = useState<Address | null>(null);
  const [open, setOpen] = useState(false);
  const handelClose = () => {
    setAddressForEdit(null);
    setOpen(false);
  };
  const handelOpen = () => {
    setAddressForEdit(null);
    setOpen(true);
  };
  const { addAddress, editAddress, addressType, addresses, changeDefaultAddress, removeAddress } =
    addressesObject;
  const AddressFunctions = { addAddress, editAddress, addressType, removeAddress };
  const style: SxProps = { backgroundColor: 'rgb(245,245,245)', p: 1, borderRadius: '10px' };

  const handleEdit = (address: Address) => {
    setAddressForEdit(address);
    setOpen(true);
  };
  return (
    <>
      <RenderIf when={addresses.length > 0}>
        {addresses.map((address) => (
          <Box key={address.addressId} sx={style}>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Button
                  size="small"
                  sx={{ paddingRight: 1 }}
                  onClick={() => changeDefaultAddress(address.addressId)}
                >
                  <Radio
                    size="small"
                    checked={address.isDefault}
                    checkedIcon={<Icon icon="akar-icons:circle-check-fill" />}
                  />{' '}
                  {address.isDefault ? ' selected' : 'select'}
                </Button>
              </Box>
              <Box sx={{ justifyContent: 'space-between' }}>
                <IconButton color="error" onClick={() => removeAddress(address.addressId)}>
                  <Icon icon="fluent:delete-12-regular" color="red" />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleEdit(address)}>
                  <Icon icon="bx:edit" color={theme.palette.secondary.main} />
                </IconButton>
              </Box>
            </Stack>
            <Box margin={1.2}>
              <Typography>{address.businessAddress}</Typography>
              <Typography>
                {address.city}, {address.state}
              </Typography>
              <Typography>Pin: {address.pinCode}</Typography>
            </Box>
          </Box>
        ))}
      </RenderIf>
      <AnimatedDottedBox title={title} onClick={handelOpen} />
      <AddressModal
        AddressFunctions={AddressFunctions}
        defaultAddress={addressForEdit}
        isModalOpen={open}
        handleCloseModal={handelClose}
        title={title}
      />
    </>
  );
};
