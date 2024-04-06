import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, DialogActions, Grid, IconButton, Tooltip } from '@mui/material';
import { useForm } from 'react-hook-form';
import Iconify from 'src/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGeneral } from 'src/hooks/myHooks/database/useGeneral';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { NewAddressSchema } from '../../../validation/yupValidation';
import { boxGridSx } from '../../../utils/CommonSX';
import { AddressType, IAddress } from '../../../@types/address';

type Props = {
  defaultAddress: IAddress | null;
  addressType: AddressType;
  handleCloseModal: () => void;
  addAddress: (address: IAddress) => void;
  editAddress: (address: IAddress) => void;
  removeAddress: (address_id: string) => void;
};

// type FormDataType = Omit<Address, 'isDefault' | 'AddressType'>;

export const AddressForm: FC<Props> = ({
  defaultAddress,
  addressType,
  handleCloseModal,
  addAddress,
  editAddress,
  removeAddress,
}) => {
  const { getInitialAddress } = useGeneral();

  const defaultValues = getInitialAddress(defaultAddress, addressType);

  const methods = useForm({ defaultValues, resolver: yupResolver(NewAddressSchema) });
  const {
    reset,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    if (defaultAddress) {
      editAddress(data);
    } else {
      addAddress(data);
    }
    reset(getInitialAddress(null, addressType));
    handleCloseModal();
  };
  return (
    <FormProvider methods={methods}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} margin={3}>
          <Grid item xs={12} md={12} margin={2}>
            <RHFTextField name="businessAddress" label="Business Address" required />
          </Grid>
          <Box sx={boxGridSx} margin={2}>
            <RHFTextField name="pinCode" label="Pin Code" required />
            <RHFTextField name="state" label="State" />
            <RHFTextField name="city" label="City" required />
          </Box>
          <DialogActions>
            {defaultAddress && (
              <Tooltip title="Delete Address">
                <IconButton
                  onClick={() => {
                    removeAddress(getValues('addressId'));
                    handleCloseModal();
                  }}
                  color="error"
                >
                  <Iconify icon="eva:trash-2-outline" width={20} height={20} />
                </IconButton>
              </Tooltip>
            )}
            <Box sx={{ flexGrow: 1 }} />

            <Button variant="outlined" color="inherit" onClick={handleCloseModal}>
              Cancel
            </Button>

            <LoadingButton
              type="button"
              variant="contained"
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {!defaultAddress ? 'Add' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
