import {createTheme} from "@mui/material";
import {palette} from './palette'
import {shadows} from './shadows'
import shape from './shape'
import typography from "./typography";
import breakpoints from "../breakpoints";

export const lightTheme = createTheme({
  palette: {...palette},
  shadows: shadows,
  shape: shape,
  typography: typography,
  breakpoints: breakpoints,
  components: {
    MuiAppBar: {
      defaultProps: {
        // elevation: 0
      },
      styleOverrides: {}
    }
  }
})
