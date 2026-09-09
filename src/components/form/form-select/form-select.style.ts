import styled, { css } from "styled-components";
import { StyledProp } from "../../styles/theme";
import { ValidatingState } from "../form-types";
import { createValidatingFormControlCssBlock } from "../form-utils";

export type SelectSize = "md" | "lg";

export const Container = styled.div<
  StyledProp<{ state: ValidatingState; isOpen?: boolean; size?: SelectSize }>
>`
  display: flex;
  min-height: ${({ $styled }) => ($styled?.size === "lg" ? "44px" : "32px")};
  position: relative;
  padding: ${({ $styled }) =>
    $styled?.size === "lg" ? "14px 12px" : "6px 12px"};
  align-items: stretch;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary20};
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  cursor: pointer;

  &:has(:focus) {
    border-color: ${({ theme }) => theme.colors.orderPrimary.orderPrimary90};
  }

  &:has(:hover) {
    border: 1px solid
      ${({ theme }) => theme.colors.orderSecondary.orderSecondary40};
  }

  ${({ $styled }) =>
    $styled.isOpen &&
    css`
      border-color: ${({ theme }) => theme.colors.orderPrimary.orderPrimary90};
    `}

  &,
  & * {
    box-sizing: border-box;
  }

  ${({ $styled, theme }) =>
    createValidatingFormControlCssBlock({ state: $styled.state, theme })}

  &:has(:disabled) {
    border: 1px solid ${({ theme }) => theme.colors.bn.bn20};
    background-color: #f9f9fa;
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  width: 0;
`;

export const NoResults = styled.div`
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
  text-align: center;
  width: 100%;
`;
