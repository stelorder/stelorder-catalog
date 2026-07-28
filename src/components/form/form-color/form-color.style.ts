import styled from "styled-components";
import { StyledProp } from "../../styles/theme";
import { ValidatingState } from "../form-types";
import { createValidatingFormControlCssBlock } from "../form-utils";

export const StyledDotLabel = styled.label<
  StyledProp<{ dotSize: number; borderRadius: string }>
>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $styled }) => $styled.dotSize}px;
  height: ${({ $styled }) => $styled.dotSize}px;
  border-radius: ${({ $styled }) => $styled.borderRadius};
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: transparent;

  /* Esto es un anillo que le heemos puesto alrededor para que sea visible en fondos oscuros */
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }

  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px
      ${({ theme }) => theme.colors.orderPrimary.orderPrimary90};
  }
`;

export const StyledDotInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 200%;
  height: 200%;
  border: none;
  padding: 0;
  margin: -50%;
  cursor: pointer;
  background: transparent;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
  }
  &::-moz-color-swatch {
    border: none;
  }
`;

export const StyledInputContainer = styled.div<
  StyledProp<{ state?: ValidatingState }>
>`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 6px;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary20} !important;
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};

  &,
  & * {
    box-sizing: border-box;
  }

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors.orderSecondary.orderSecondary40};
  }

  &:focus-within {
    outline: none;
    border-color: ${({ theme }) =>
      theme.colors.orderPrimary.orderPrimary90} !important;
    box-shadow: none !important;
  }

  &:has(:disabled) {
    border: 1px solid ${({ theme }) => theme.colors.bn.bn20};
    background-color: #f9f9fa;
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
    cursor: not-allowed;
  }

  ${({ $styled, theme }) =>
    createValidatingFormControlCssBlock({
      state: $styled?.state,
      theme,
    })}
`;

export const StyledColorSwatch = styled.label<
  StyledProp<{ dotSize?: number; borderRadius?: string }>
>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $styled }) => $styled.dotSize ?? 20}px;
  height: ${({ $styled }) => $styled.dotSize ?? 20}px;
  border-radius: ${({ $styled }) => $styled.borderRadius ?? "50%"};
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
`;

export const StyledHiddenInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 200%;
  height: 200%;
  border: none;
  padding: 0;
  margin: -50%;
  cursor: pointer;
  background: transparent;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
  }
  &::-moz-color-swatch {
    border: none;
  }
`;

export const StyledTextInput = styled.input`
  border: none;
  background: transparent;
  flex: 1;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  font-family: ${({ theme }) => theme.defaults.cardText.fontFamily};
  font-size: 14px;
  line-height: 140%;
  font-weight: 400;
  padding: 0;
  text-transform: uppercase;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  }
`;
