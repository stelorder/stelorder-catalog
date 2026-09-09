import styled, { css } from "styled-components";
import { StyledProp } from "../../../styles/theme";

export const StyledDropdown = styled.div<
  StyledProp<{
    isOpen?: boolean;
    boxPosition?: "top" | "bottom";
    maxWidth?: string;
  }>
>`
  position: absolute;
  left: 0;
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  z-index: 10;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  min-width: 100%;
  width: max-content;
  max-width: ${({ $styled }) => $styled.maxWidth ?? "none"};
  max-height: 320px;
  overflow: hidden;
  outline: 1px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary10};
  outline-offset: -1px;

  ${({ $styled }) =>
    !$styled?.isOpen &&
    css`
      display: none;
    `}

  ${({ $styled }) =>
    $styled?.boxPosition === "top" &&
    css`
      top: -10px;
      transform: translateY(-100%);
    `}

  ${({ $styled }) =>
    $styled?.boxPosition !== "top" &&
    css`
      bottom: -10px;
      transform: translateY(100%);
    `}
`;
