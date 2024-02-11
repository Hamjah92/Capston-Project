import { Checkbox } from '@mui/material';
import { FC, FormEventHandler, useEffect, useRef } from 'react';

type Props = {
  checked: boolean;
  indeterminate: boolean;
  onChange: FormEventHandler<HTMLInputElement>;
};

export const RTCheckBox: FC<Props> = ({ indeterminate, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return <Checkbox indeterminate={indeterminate} inputRef={ref} {...rest} />;
};
