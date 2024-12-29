import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  // You can customize your theme here
  // For example:
  // palette: {
  //   primary: {
  //     main: '#556cd6',
  //   },
  //   secondary: {
  //     main: '#19857b',
  //   },
  // },
};

export function createAppTheme() {
  return createTheme(themeOptions);
}
