import styled, { css } from "styled-components";
import { SearchInputSize, SearchInputVariant } from "./search-input";
import { StyledProp } from "../styles/theme";

const sizes: Record<
  SearchInputSize,
  { w: string; h: string; p: string; gap: string }
> = {
  l: { w: "245px", h: "20px", p: "3px 8px 3px 10px", gap: "10px" },
  xl: { w: "820px", h: "20px", p: "3px 8px 3px 10px", gap: "10px" },
  m: { w: "108px", h: "20px", p: "3px 8px 3px 10px", gap: "10px" },
};

/** Variante `outlined`: caja blanca de 30px con borde suave; el texto se refuerza en hover/foco. */
const outlinedVariant = css`
  box-sizing: border-box;
  height: 30px;
  padding: 4px 8px 4px 12px;
  border-radius: 6px;
  border: 1px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary20};
  background-color: ${({ theme }) =>
    theme.colors.orderSecondary.orderSecondary0};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
  caret-color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.orderPrimary.orderPrimary90};
  }

  &:hover::placeholder,
  &:focus::placeholder {
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  }
`;

/** Caja que agrupa el adorno y el campo cuando se pasa `startAdornment`. */
export const StyledSearchInputShell = styled.div<
  StyledProp<{
    size: SearchInputSize;
    variant: SearchInputVariant;
    fluid: boolean;
  }>
>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  padding: ${({ $styled }) => sizes[$styled.size].p};
  width: ${({ $styled }) => sizes[$styled.size].w};
  background-color: ${({ theme }) =>
    theme.colors.orderSecondary.orderSecondary5};

  ${({ $styled }) => $styled.variant === "outlined" && outlinedVariant}

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.orderPrimary.orderPrimary90};
  }

  ${({ $styled }) =>
    $styled.fluid &&
    css`
      flex: 1 1 0;
      width: 100%;
      min-width: 0;
    `}
`;

export const StyledSearchInput = styled.input<
  StyledProp<{
    size: SearchInputSize;
    variant: SearchInputVariant;
    fluid: boolean;
    inShell: boolean;
  }>
>`
  border-radius: 8px;
  padding: ${({ $styled }) => sizes[$styled.size].p};
  font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
  font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};
  width: ${({ $styled }) => sizes[$styled.size].w};
  height: ${({ $styled }) => sizes[$styled.size].h};
  outline: none;
  border: none;
  background-color: ${({ theme }) =>
    theme.colors.orderSecondary.orderSecondary5};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};

  &::placeholder {
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
    fonts: ${({ theme }) => theme.fonts.h1400};
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${({ $styled }) => $styled.variant === "outlined" && outlinedVariant}

  ${({ $styled }) =>
    $styled.fluid &&
    css`
      flex: 1 1 0;
      width: 100%;
      min-width: 0;
    `}

  ${({ $styled }) =>
    $styled.inShell &&
    css`
      flex: 1 1 0;
      width: 100%;
      min-width: 0;
      height: auto;
      padding: 0;
      border: none;
      border-radius: 0;
      background-color: transparent;
    `}
`;
