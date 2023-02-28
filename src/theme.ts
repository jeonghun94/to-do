// import { DefaultTheme } from "styled-components";

// export const darkTheme: DefaultTheme = {
//   bgColor: "#1F2937",
//   itemBgColor: "#374151",
//   textColor: "white",
//   accentColor: "#3B81F6",
// };

// export const lightTheme: DefaultTheme = {
//   bgColor: "#efefef",
//   itemBgColor: "white",
//   textColor: "#222222",
//   accentColor: "#3B81F6",
// };

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
