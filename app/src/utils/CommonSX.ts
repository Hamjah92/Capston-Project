import { SxProps, Theme } from "@mui/material";

export const boxGridSx: SxProps<Theme> = {
  display: 'grid',
  columnGap: 2,
  rowGap: 3,
  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
};

export const boxGridSxTwoCl: SxProps<Theme> = {
  display: 'grid',
  columnGap: 2,
  rowGap: 2,
  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
}