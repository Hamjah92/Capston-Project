import { Box, SxProps, Theme, Typography } from '@mui/material';
import { FC, MouseEventHandler } from 'react';
import BoxCss from './box.module.css';
type Props = {
  sx?: SxProps<Theme>;
  title: string;
  onClick: MouseEventHandler<HTMLElement>;
};

export const AnimatedDottedBox: FC<Props> = ({ sx, title, ...rest }) => (
  <Box
    className={BoxCss.box}
    sx={{
      display: 'flex',
      p: 5,
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      ...sx,
    }}
    {...rest}
  >
    <Typography>{title}</Typography>
  </Box>
);
