import { createGlobalStyle } from "styled-components";
import RobotItalicVariableWoff2 from "../../assets/fonts/Roboto-Italic-VariableFont_wdth,wght.woff2";
import RobotoVariableWoff2 from "../../assets/fonts/Roboto-VariableFont_wdth,wght.woff2";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoVariableWoff2}) format('woff2');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotItalicVariableWoff2}) format('woff2');
    font-weight: 100 900;
    font-style: italic;
    font-display: swap;
  }

  .text-title {
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
    font-family: ${({ theme }) => theme.defaults.title.fontFamily};
    font-size: ${({ theme }) => theme.defaults.title.fontSize};
    font-weight: ${({ theme }) => theme.defaults.title.fontWeight};
    line-height: ${({ theme }) => theme.defaults.title.lineHeight};
    font-style: ${({ theme }) => theme.defaults.title.fontStyle};
    text-align: ${({ theme }) => theme.defaults.title.textAlign};
    font-feature-settings: ${({ theme }) =>
      theme.defaults.title.fontFeatureSettings};
  }
  .text1 {
    color: ${({ theme }) => theme.colors.bn.bn100};
    font-family: ${({ theme }) => theme.defaults.text1.fontFamily};
    font-size: ${({ theme }) => theme.defaults.text1.fontSize};
    font-weight: ${({ theme }) => theme.defaults.text1.fontWeight};
    line-height: ${({ theme }) => theme.defaults.text1.lineHeight};
    font-style: ${({ theme }) => theme.defaults.text1.fontStyle};
    text-align: ${({ theme }) => theme.defaults.text1.textAlign};
    font-feature-settings: ${({ theme }) =>
      theme.defaults.text1.fontFeatureSettings};
  }
  .text2 {
    color: ${({ theme }) => theme.colors.bn.bn90};
    font-family: ${({ theme }) => theme.defaults.text2.fontFamily};
    font-size: ${({ theme }) => theme.defaults.text2.fontSize};
    font-weight: ${({ theme }) => theme.defaults.text2.fontWeight};
    line-height: ${({ theme }) => theme.defaults.text2.lineHeight};
    font-style: ${({ theme }) => theme.defaults.text2.fontStyle};
    text-align: ${({ theme }) => theme.defaults.text2.textAlign};
    font-feature-settings: ${({ theme }) =>
      theme.defaults.text2.fontFeatureSettings};
  }
`;

export default GlobalStyle;
