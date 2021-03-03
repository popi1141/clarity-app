import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#6266EA',
      first: '#7F63FF',
      second: '#8CC9FF',
    },
    secondary: {
      main: '#FBC4E1'
    },
    text: {
      grayOne: '#F4F4F4',
      grayTwo: '#D0D3D8',
      grayThree: '#ABB2BD'
    },
    highlight: {
      pink: '#FF5689',
      green: '#53C587'
    },
    black: '#3A3A3A',
    white: '#FFFFFF'
  },
  shadows,
  typography
});

export default theme;
