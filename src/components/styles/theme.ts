import React from "react";
import AppThemeProvider from "./appThemeProvider";

const blue = "#004cbd";
const intensifyBlue = "#00409F";
const orderSecondary = "#282848";
const green = "#B6E0D5";
const lightGreen = "#D8F0EA";

export const colors = {
  blue: {
    hover: intensifyBlue,
    blue100: blue,
    blue90: "#1A5EC4",
    blue80: "#3370CA",
    blue70: "#4D82D1",
    blue60: "#6694d7",
    blue50: "#80A5DE",
    blue40: "#99B7E5",
    blue30: "#B2C9EB",
    blue20: "#CCDBF2",
    blue10: "#E5EDF8",
    blue5: "#F5F6FC",
  },
  orderSecondary: {
    orderSecondary100: orderSecondary,
    orderSecondary90: "#3e3e5a",
    orderSecondary80: "#53536D",
    orderSecondary70: "#69697F",
    orderSecondary60: "#7e7e91",
    orderSecondary50: "#9393A3",
    orderSecondary40: "#A9A9B6",
    orderSecondary30: "#BEBEC8",
    orderSecondary20: "#D4D4DA",
    orderSecondary10: "#E9E9ED",
    orderSecondary5: "#F4F4F6",
    orderSecondary0: "#FFFFFF",
  },

  alertError: {
    alertError100: "#AB0F0F",
    alertError10: "#FFEDED",
  },

  alertSuccess: {
    alertSuccess100: "#46C62F",
    alertSuccess30: "#BBEBB2",
    alertSuccess20: "#DFF5DC",
    alertSuccess10: "#E9F8E6",
    alertSuccess5: "#F4FCF3",
  },

  bn: {
    bn100: "#2e2e2e",
    bn90: "#3D3D3D",
    bn80: "#5C5C5C",
    bn60: "#878787",
    bn30: "#C2C2C2",
    bn25: "#E4E4E4",
    bn20: "#D4D4DA",
    bn10: "#F8F8F8",
    bn5: "#FAFAFA",
    bn0: "#fff",
  },
  green: {
    green100: green,
    green90: lightGreen,
  },
  orderPrimary: {
    orderPrimary110: "#8d3600ff",
    orderPrimary100: "#FA6B00",
    orderPrimary90: "#FD893A",
    orderPrimary80: "#FDA061",
    orderPrimary70: "#FEAC75",
    orderPrimary60: "#FEB889",
    orderPrimary50: "#FEC49C",
    orderPrimary40: "#FED0B0",
    orderPrimary30: "#FEDCC4",
    orderPrimary20: "#F3EDE2",
    orderPrimary15: "#FFF1E6",
    orderPrimary10: "#F9F5F2",
  },
  status: {
    warning: "#FFE76C",
    info: "#A8D5FF",
    success: "#3FD99D",
    danger: "#F4AEAE",
    dangerVerifactu: "#AB0F0F",
  },
  basicManagement: {
    bg100: "#45DCC6",
    bg50: "#A2EDE2",
    bg30: "#C7F4EE",
    bg15: "#E3FAF6",
  },
  tempoSecundary: {
    tempoSecundary100: "#254942",
    tempoSecundary90: "#3B5B55",
    tempoSecundary80: "#516D68",
    tempoSecundary70: "#66807B",
    tempoSecundary60: "#7C928E",
    tempoSecundary50: "#92A4A0",
    tempoSecundary40: "#A8B6B3",
    tempoSecundary30: "#BEC8C6",
    tempoSecundary20: "#D3DBD9",
    tempoSecundary10: "#E9EDEC",
  },
  highlighted: {
    highlighted1: "#6957D7",
    highlighted2: "#B0A6EC",
    highlighted3: "#8A38F5",
    highlighted4: "#6694D7",
  },
};

export const fonts = {
  h1500: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "140%",
  },
  h2500: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "130%",
  },
  titleL500: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "130%",
  },
  titleL700: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "130%",
  },
  h1400: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "140%",
  },
  h2400: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "130%",
  },
  titleXl500: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "120%",
  },
};

export const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

export const defaults = {
  grid: {
    wrap: true,
    fullWidth: true,
    alignX: "start",
    alignY: "start",
    direction: "row",
    gap: 8,
    itemsPerLine: 1,
    col: 1,
    maxWidth: "1200px",
  },
  card: {
    as: "div",
    text: "center",
    shadow: false,
    rounded: true,
    hook: false,
  },
  // Tipografía Card.Title
  cardTitle: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "110%",
    fontStyle: "normal",
  },
  // Tipografía Card.Text
  cardText: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "normal",
    fontStyle: "normal",
  },

  documentCardInfoTitle: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "130%",
    fontStyle: "normal",
  },

  documentCardInfoBody: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "140%",
    fontStyle: "normal",
  },

  documentCardInfoFooter: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "140%",
    fontStyle: "normal",
  },

  badgeText: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "140%",
    fontStyle: "normal",
  },

  // Tipografía formulario
  formLabel: {
    fontFeatureSettings: "'liga' off",

    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "140%" /* 19.6px */,
  },

  //Tipografia Navbar
  navbarLabel: {
    fontFeatureSettings: "'liga' off",

    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "140%" /* 19.6px */,
  },

  formFeedback: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "140%",
    fontFeatureSettings: "'liga' off",
  },

  title: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "130%",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    textAlign: "center",
  },
  text1: {
    fontFamily: "Inter",
    fontSize: "14.721px",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: "130%",
  },
  text2: {
    fontFamily: "Inter",
    fontSize: "11.777px",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: "160%",
  },
};

export const integrationsTheme = {
  colors,
  fonts,
  breakpoints,
  defaults,
};

export type breakpointsType = keyof typeof breakpoints;

export type IntegrationsThemeType = typeof integrationsTheme;

export type PrefixedProps<T, P extends string> = {
  [K in keyof T as `${P}${K & string}`]: T[K];
};

export type TransientProps<T> = PrefixedProps<T, "$">;

export type HtmlProps<T> = { htmlProps?: React.HTMLProps<T> };

export type StyledProp<T> = { $styled: T };

export { AppThemeProvider };
