import { useFormContext } from 'react-hook-form';
import { FC, ReactNode } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

type Props = LoadingButtonProps & {
  children: ReactNode;
};

export const RHFSubmitButton: FC<Props> = ({ children, ...rest }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <LoadingButton type="submit" variant="contained" loading={isSubmitting} {...rest}>
      {children}
    </LoadingButton>
  );
};
