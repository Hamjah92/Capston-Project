import { Button, MenuItem } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useCustomer } from 'src/hooks/myHooks/database/useCustomer';
import { paths } from 'src/routes/paths';

type Props = {
  handleCloseMenu: VoidFunction;
  row: Row<any>;
};

export const CustomerActions: FC<Props> = ({ handleCloseMenu, row }) => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const {
    original: { customerId },
  } = row;
  const { deleteCustomerByID } = useCustomer();

  const [openConfirm, setOpenConfirm] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: delCust } = useMutation({
    mutationFn: deleteCustomerByID,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: data.type });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  return (
    <>
      <MenuItem
        onClick={() => {
          handleOpenConfirm();
        }}
        sx={{ color: 'error.main' }}
      >
        <Iconify icon="eva:trash-2-outline" />
        Delete
      </MenuItem>
      <MenuItem onClick={() => navigate(paths.dashboard.customer.edit(customerId))}>
        <Iconify icon="eva:edit-fill" />
        Edit
      </MenuItem>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={<>Are you sure want to delete items?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              delCust(customerId);
              handleCloseMenu();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
};
