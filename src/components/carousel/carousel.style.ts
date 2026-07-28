import styled, { css } from "styled-components";
import { StyledProp } from "../styles/theme";
export const StyledCarousel = styled.div<StyledProp<{ gap?: string }>>`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: ${(props) => props.$styled.gap || "0px"};
  padding: 10px;

  &::-webkit-scrollbar {
    height: 7px;
  }

  &::-webkit-scrollbar-track {
    display: flex;
    margin: 2px 4px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    margin: 2px 4px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    margin: 2px 4px;
    background: rgba(0, 0, 0, 0.6);
  }

  &::-webkit-scrollbar-button {
    margin: 2px 4px;
    display: none !important;
  }

  &::-webkit-scrollbar-corner {
    margin: 2px 4px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb:vertical {
    background-color: #0a4c95;
  }
`;

export const StyledArrowButton = styled.button<
  StyledProp<{ position: "left" | "right" }>
>`
  position: absolute;
  top: 50%;
  z-index: 10;
  ${(props) =>
    props.$styled.position === "left"
      ? css`
          left: 10px;
          transform: translateY(-50%) rotate(180deg);
        `
      : css`
          right: 10px;
          transform: translateY(-50%);
        `}

  background: rgba(0, 0, 0, 0.7);
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: ${(props) =>
      props.$styled.position === "left"
        ? "translateY(-50%) rotate(180deg) scale(1.1)"
        : "translateY(-50%) scale(1.1)"};
  }

  &:active {
    transform: ${(props) =>
      props.$styled.position === "left"
        ? "translateY(-50%) rotate(180deg) scale(0.95)"
        : "translateY(-50%) scale(0.95)"};
  }

  transition: all 0.2s ease;
`;

export const StyledSlide = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
`;

export const StyledItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    height: auto;
  }
`;
