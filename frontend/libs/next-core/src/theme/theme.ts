import { createTheme, ThemeOptions } from '@mui/material';

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
};

export const theme = createTheme(darkTheme);
