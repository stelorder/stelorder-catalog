import styled, { css } from "styled-components";
import type { CSSObject } from "styled-components";
import { IntegrationsThemeType, StyledProp } from "../styles/theme";
import type { IconWrapperStyles } from "./icon-wrapper";

const stateStyles = (styles?: CSSObject | false) => {
  if (!styles) return "";
  return css(styles);
};

export const StyledIconWrapper = styled.div<
  StyledProp<{
    color?: string;
    height?: string;
    width?: string;
    radius?: string;
    border?: string;
    styles?: IconWrapperStyles;
    theme: IntegrationsThemeType;
  }>
>`
  display: flex;
  width: ${({ $styled }) => $styled.width || "30.6px"};
  height: ${({ $styled }) => $styled.height || "30.6px"};
  border-radius: ${({ $styled }) => $styled.radius || "50px"};
  border: ${({ $styled }) => $styled.border || "none"};
  justify-content: center;
  align-items: center;
  background-color: ${({ $styled, theme }) =>
    $styled.color || theme.colors.orderPrimary};

  ${({ $styled }) => stateStyles($styled.styles?.default)}

  &:hover {
    ${({ $styled }) => stateStyles($styled.styles?.hover)}
  }

  &:focus,
  &:focus-visible {
    ${({ $styled }) => stateStyles($styled.styles?.focus)}
  }
`;
