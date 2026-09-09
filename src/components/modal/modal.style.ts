import styled, { css } from "styled-components";
import { StyledProp } from "../styles/theme";
import { ModalLayout } from "./modal";

export const StyledBackdropContainer = styled.div<
  StyledProp<{ fade: boolean; animationDurationSec: number }>
>`
  --backdrop-zindex: 1050;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: var(--backdrop-zindex);
  background-color: ${({ theme, $styled }) =>
    $styled.fade ? theme.colors.bn.bn100 : "transparent"};
  &.fade {
    opacity: 0;
    transition: opacity ${({ $styled }) => $styled.animationDurationSec}s linear;
  }

  &.show {
    opacity: 0.5;
  }
`;

export const StyledModalContainer = styled.div<
  StyledProp<{ isCentered: boolean }>
>`
  --modal-zindex: 1055;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  z-index: var(--modal-zindex);
  ${({ $styled }) =>
    $styled.isCentered &&
    css`
      align-items: center;
    `}
  pointer-events: none;
`;

export const StyledModalContent = styled.div<
  StyledProp<{ animationDurationSec: number; layout: ModalLayout }>
>`
  position: relative;
  transform: translateY(-20px);
  opacity: 0;
  margin-top: 28px;
  margin-bottom: 28px;
  min-width: min(431px, 90%);
  max-width: 431px;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  transition: all ${({ $styled }) => $styled.animationDurationSec}s linear;

  ${({ $styled }) =>
    $styled.layout === "centered" &&
    css`
      display: flex;
      flex-direction: column;
    `}

  .fade.show + * > & {
    transform: translateY(0);
    opacity: 1;
  }

  .modal-title {
    font-family: ${({ theme }) => theme.fonts.titleXl500.fontFamily};
    font-size: ${({ theme }) => theme.fonts.titleXl500.fontSize};
    font-weight: ${({ theme }) => theme.fonts.titleXl500.fontWeight};
    line-height: ${({ theme }) => theme.fonts.titleXl500.lineHeight};
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  }

  .modal-text {
    font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
    font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
    font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
    line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  }

  pointer-events: auto;
`;

export const StyledCenteredIconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
`;

export const StyledModalIconRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
`;

export const StyledIconAddon = styled.div`
  flex-shrink: 0;
  width: 58px;
  height: 58px;
  padding: 10px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 32px;
  right: 32px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: inherit;

  &:hover {
    opacity: 0.8;
  }
`;
