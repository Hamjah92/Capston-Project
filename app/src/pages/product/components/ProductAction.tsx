import { Button, MenuItem } from '@mui/material';
import { Row } from '@tanstack/react-table';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { useProduct } from 'src/hooks/myHooks/database/useProduct';
import { paths } from 'src/routes/paths';

type Props = {
  handleCloseMenu: VoidFunction;
  row: Row<any>;
};

export const ProductAction: FC<Props> = ({ handleCloseMenu, row }) => {
  const navigate = useNavigate();

  const {
    original: { productId },
  } = row;
  const { deleteById } = useProduct();

  const [openConfirm, setOpenConfirm] = useState(false);

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
      <MenuItem onClick={() => navigate(paths.dashboard.product.edit(productId))}>
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
              deleteById(productId);
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
