import styled, { DefaultTheme } from "styled-components";
import { ButtonSize, ButtonVariant } from "./button";
import { StyledProp } from "../styles/theme";

const sizes: Record<ButtonSize, { w: string; h: string; p: string }> = {
  m: { w: "75px", h: "28px", p: "4px 10px" },
  l: { w: "73px", h: "30px", p: "4px 10px" },
  xl: { w: "89px", h: "40px", p: "10px 16px" },
};

const radius: Record<ButtonSize, number> = {
  xl: 8,
  l: 6,
  m: 4,
};

type ButtonVariantProps = {
  [key in ButtonVariant]: (theme: DefaultTheme) => ButtonVariantCSSProps & {
    hover?: (theme: DefaultTheme) => ButtonVariantCSSProps;
  };
};

type ButtonVariantCSSProps = {
  backgroundColor?: string;
  color?: string;
  border?: string;
};

const buttonVariantProps: ButtonVariantProps = {
  primary: (theme) => ({
    backgroundColor: theme.colors.blue.blue100,
    color: theme.colors.bn.bn0,
    hover: (theme) => ({
      backgroundColor: theme.colors.blue.hover,
    }),
  }),
  secondary: (theme) => ({
    backgroundColor: theme.colors.orderSecondary.orderSecondary100,
    color: theme.colors.bn.bn0,
    hover: (theme) => ({
      backgroundColor: theme.colors.orderSecondary.orderSecondary90,
    }),
  }),
  gray: (theme) => ({
    backgroundColor: theme.colors.bn.bn10,
    color: theme.colors.orderSecondary.orderSecondary90,
    border: `1px solid ${theme.colors.bn.bn20}`,
    hover: (theme) => ({
      backgroundColor: theme.colors.bn.bn5,
      border: `1px solid ${theme.colors.bn.bn30}`,
      color: theme.colors.orderSecondary.orderSecondary100,
    }),
  }),
  white: (theme) => ({
    backgroundColor: theme.colors.bn.bn0,
    color: theme.colors.orderSecondary.orderSecondary90,
    border: `1px solid ${theme.colors.bn.bn20}`,
    hover: (theme) => ({
      backgroundColor: theme.colors.bn.bn0,
      border: `1px solid ${theme.colors.bn.bn30}`,
      color: theme.colors.orderSecondary.orderSecondary100,
    }),
  }),
  whiteOutlineFree: (theme) => ({
    backgroundColor: theme.colors.bn.bn0,
    color: theme.colors.orderSecondary.orderSecondary90,
    border: "1px solid transparent",
    hover: (theme) => ({
      color: theme.colors.orderSecondary.orderSecondary100,
      border: `1px solid ${theme.colors.orderSecondary.orderSecondary30}`,
    }),
  }),
  grayOutlineFree: (theme) => ({
    backgroundColor: theme.colors.bn.bn10,
    color: theme.colors.orderSecondary.orderSecondary90,
    border: "1px solid transparent",
    hover: (theme) => ({
      color: theme.colors.orderSecondary.orderSecondary100,
      border: `1px solid ${theme.colors.orderSecondary.orderSecondary30}`,
    }),
  }),
  lite: (theme) => ({
    backgroundColor: theme.colors.green.green90,
    color: theme.colors.orderSecondary.orderSecondary90,
    hover: (theme) => ({
      backgroundColor: theme.colors.green.green100,
      color: theme.colors.orderSecondary.orderSecondary100,
    }),
  }),
  disabled: (theme) => ({
    backgroundColor: "transparent",
    color: theme.colors.orderSecondary.orderSecondary40,
    border: `1px solid ${theme.colors.orderSecondary.orderSecondary30}`,
  }),
  lightBlue: (theme) => ({
    backgroundColor: theme.colors.blue.blue5,
    color: theme.colors.orderSecondary.orderSecondary90,
    border: `1px solid ${theme.colors.blue.blue20}`,
    hover: (theme) => ({
      backgroundColor: theme.colors.blue.blue10,
      color: theme.colors.orderSecondary.orderSecondary100,
      border: `1px solid ${theme.colors.blue.blue40}`,
    }),
  }),
  danger: (theme) => ({
    backgroundColor: theme.colors.posPrimary.posPrimary30,
    color: theme.colors.bn.bn100,
    hover: (theme) => ({
      backgroundColor: theme.colors.posPrimary.posPrimary80,
    }),
  }),
};

export const StyledButton = styled.button<
  StyledProp<{
    variant: ButtonVariant;
    size: ButtonSize;
  }>
>`
  border: none;
  border-radius: ${({ $styled }) => radius[$styled.size]}px;
  text-decoration: none;
  padding: ${({ $styled }) => sizes[$styled.size].p};
  font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
  font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};
  cursor: pointer;
  min-width: ${({ $styled }) => sizes[$styled.size].w};
  min-height: ${({ $styled }) => sizes[$styled.size].h};
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border 0.2s ease;
  ${({ theme, $styled }) => {
    const variantProps = buttonVariantProps[$styled.variant];
    if (!variantProps) return "";
    const styles = variantProps(theme);
    return `
      ${styles.backgroundColor ? `background-color: ${styles.backgroundColor};` : ""}
      ${styles.color ? `color: ${styles.color};` : ""}
      ${styles.border ? `border: ${styles.border};` : ""}
    `;
  }}

  &:hover {
    ${({ theme, $styled }) => {
      const hoverFn = buttonVariantProps[$styled.variant]?.(theme).hover;
      if (!hoverFn) return "";
      const hoverStyles = hoverFn(theme);
      return `
        ${hoverStyles.backgroundColor ? `background-color: ${hoverStyles.backgroundColor};` : ""}
        ${hoverStyles.color ? `color: ${hoverStyles.color};` : ""}
        ${hoverStyles.border ? `border: ${hoverStyles.border};` : ""}
      `;
    }}
  }

  &:disabled {
    ${({ theme }) => {
      const disabled = buttonVariantProps.disabled(theme);
      return `
        ${disabled.backgroundColor ? `background-color: ${disabled.backgroundColor};` : ""}
        ${disabled.color ? `color: ${disabled.color};` : ""}
        ${disabled.border ? `border: ${disabled.border};` : ""}
        cursor: not-allowed;
      `;
    }}
  }
`;
