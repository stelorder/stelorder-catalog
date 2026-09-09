import styled, { css } from "styled-components";
import { StyledProp } from "../../styles/theme";
import { ValidatingState } from "../form-types";
import { createValidatingFormControlCssBlock } from "../form-utils";

export const StyledDateInputContainer = styled.div<
  StyledProp<{ state?: ValidatingState; isOpen?: boolean }>
>`
  display: flex;
  min-height: 32px;
  position: relative;

  padding: 6px 12px;
  align-items: center;
  gap: 8px;

  border-radius: 6px;
  border: 1px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary20} !important;
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  cursor: pointer;

  &,
  & * {
    box-sizing: border-box;
  }

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors.orderSecondary.orderSecondary40};
  }

  ${({ $styled }) =>
    $styled.isOpen &&
    css`
      border-color: ${({ theme }) =>
        theme.colors.orderPrimary.orderPrimary90} !important;
    `}

  &:has(input:disabled) {
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

export const StyledDateDisplay = styled.div<StyledProp<{ disabled?: boolean }>>`
  flex: 1;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${({ theme }) => theme.defaults.cardText.fontFamily};
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  padding: 0;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
  }

  ${({ $styled }) =>
    $styled?.disabled &&
    css`
      cursor: not-allowed;
      color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
    `}
`;

export const StyledPlaceholderPart = styled.span`
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
`;

export const StyledPlaceholderSlash = styled.span`
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary30};
  padding: 0 4px;
`;

export const StyledCalendarDropdown = styled.div<
  StyledProp<{ isOpen: boolean; boxPosition?: "top" | "bottom" }>
>`
  position: absolute;
  left: 0;
  z-index: 100;
  display: ${({ $styled }) => ($styled.isOpen ? "block" : "none")};

  ${({ $styled }) =>
    $styled.boxPosition === "top"
      ? css`
          bottom: calc(100% + 6px);
        `
      : css`
          top: calc(100% + 6px);
        `}
`;
