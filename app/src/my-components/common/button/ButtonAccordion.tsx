import { Icon } from '@iconify/react';
import { Box, Button, Stack, SxProps, Theme } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { RenderIf } from '../RenderIf';

type Props = {
  title: string;
  sx?: SxProps<Theme>;
  children: ReactNode;
  defaultOpen?: boolean;
};

export const ButtonAccordion: FC<Props> = ({ title, children, sx, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const handleClick = () => setIsOpen(!isOpen);
  return (
    <Stack>
      <Button
        color="primary"
        onClick={handleClick}
        sx={{ margin: 2, justifyContent: 'flex-start' }}
      >
        {isOpen ? (
          <Icon icon="akar-icons:minus" width="26" height="26" />
        ) : (
          <Icon icon="akar-icons:plus" width="26" height="26" />
        )}
        {title}
      </Button>
      <RenderIf when={isOpen}>
        <Box sx={sx}>{children}</Box>
      </RenderIf>
    </Stack>
  );
};
