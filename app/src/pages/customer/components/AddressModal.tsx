import { DialogTitle } from '@mui/material';
import { FC } from 'react';
import Scrollbar from 'src/components/scrollbar';
import DialogAnimate from 'src/components/animate/DialogAnimate';
import { AddressForm } from './AddressForm';
import { AddressType, IAddress } from '../../../@types/address';

type Props = {
  defaultAddress: IAddress | null;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  title: string;
  AddressFunctions: {
    addAddress: (address: IAddress) => void;
    editAddress: (address: IAddress) => void;
    addressType: AddressType;
    removeAddress: (address_id: string) => void;
  };
};
export const AddressModal: FC<Props> = ({
  defaultAddress,
  handleCloseModal,
  isModalOpen,
  title,
  AddressFunctions,
}) => (
  <DialogAnimate fullWidth maxWidth="lg" open={isModalOpen} onClose={handleCloseModal}>
    <DialogTitle>{title}</DialogTitle>
    <Scrollbar>
      <AddressForm
        {...AddressFunctions}
        defaultAddress={defaultAddress}
        handleCloseModal={handleCloseModal}
      />
    </Scrollbar>
  </DialogAnimate>
);
