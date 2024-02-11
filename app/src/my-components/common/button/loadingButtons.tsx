import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material';

type Props = {
  btnText: string;
  variant: 'text' | 'outlined' | 'contained' | 'soft' | undefined;
  sx?: SxProps;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loadingPosition: 'start' | 'end';
};

export const LoadingButtonIcon = ({
  btnText,
  variant,
  startIcon,
  endIcon,
  loadingPosition,
  sx,
}: Props) => (
  <LoadingButton
    loading
    loadingPosition={loadingPosition}
    endIcon={endIcon}
    startIcon={startIcon}
    sx={sx}
    variant={variant}
  >
    {btnText}
  </LoadingButton>
);
export default function LoadingButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
        Fetch data
      </LoadingButton>
      <LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
        Save
      </LoadingButton>
    </Stack>
  );
}
