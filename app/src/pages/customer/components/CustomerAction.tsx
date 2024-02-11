import { MenuItem } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { FC } from 'react';
import Iconify from 'src/components/iconify';
import { useCustomer } from 'src/hooks/myHooks/database/useCustomer';

type Props = {
  handleCloseMenu: VoidFunction;
  row: Row<any>;
};

export const CustomerActions: FC<Props> = ({ handleCloseMenu, row }) => {
  const {
    original: { customer_id },
  } = row;
  const { deleteCustomerByID } = useCustomer();
  const queryClient = useQueryClient();
  const { mutateAsync: delCust } = useMutation({
    mutationFn: deleteCustomerByID,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] }),
  });
  return (
    <>
      <MenuItem
        onClick={() => {
          delCust(customer_id);
          handleCloseMenu();
        }}
        sx={{ color: 'error.main' }}
      >
        <Iconify icon="eva:trash-2-outline" />
        Delete
      </MenuItem>
      <MenuItem onClick={() => handleCloseMenu()}>
        <Iconify icon="eva:edit-fill" />
        Edit
      </MenuItem>
    </>
  );
};
