import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#11365F',
      light: '#28395A',
    },
    secondary: {
      main: '#E94368',
    },
  },
  typography: {
    fontFamily: 'EB Garamond',
  },
});

export default theme;
