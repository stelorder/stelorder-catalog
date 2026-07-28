import styled from "styled-components";

export const StyledPlayButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background: transparent;
  padding: 0;
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    background: transparent;
    path {
      fill: currentColor !important;
    }
    circle,
    rect {
      display: none !important;
    } /* oculta el fondo blanco del SVG */
  }
`;
