import styled from "styled-components";
import { StyledProp } from "../styles/theme";
import { AlertVariant } from "./alert";

export const StyledAlert = styled.div<StyledProp<{ variant: AlertVariant }>>`
  display: flex;
  align-items: flex-start;
  position: relative;
  width: 570px;
  padding: 12px 8px 12px 18px;
  border-radius: 10px;
  border: 1px solid;
  ${({ theme }) => theme.fonts.h1400};

  ${({ $styled, theme }) => {
    switch ($styled.variant) {
      case "error":
        return `
          background-color: ${theme.colors.alertError.alertError10};
          border-color: ${theme.colors.alertError.alertError40};
          color: ${theme.colors.orderSecondary.orderSecondary90};
        `;
      case "warning":
        return `
          background-color: ${theme.colors.status.statusPendiente50};
          border-color: ${theme.colors.status.statusPendiente100};
          color: ${theme.colors.orderSecondary.orderSecondary90};
        `;
      default:
        return `
          background-color: ${theme.colors.orderSecondary.orderSecondary0};
          border-color: ${theme.colors.orderSecondary.orderSecondary20};
          color: ${theme.colors.orderSecondary.orderSecondary90};
        `;
    }
  }}
`;

export const StyledCloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: inherit;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  box-sizing: content-box;
  &:hover {
    opacity: 1;
  }
`;
