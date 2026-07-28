import styled from "styled-components";
import type { SizePx } from "../icon/icon.style";

const format = (v?: SizePx) => (v === undefined ? undefined : v);

/* Cambiado: uso de props transitorias ($width, $height, $fluid, $rounded, $roundedCircle, $thumbnail)
   para que styled-components no reenvíe estos props al DOM. */
export const StyledVideoWrapper = styled.div<{
  $width?: SizePx;
  $height?: SizePx;
  $fluid?: boolean;
  $rounded?: boolean;
  $roundedCircle?: boolean;
  $thumbnail?: boolean;
}>`
  ${(p) => {
    const w = format(p.$width);
    const h = format(p.$height);
    return `
      ${w ? `width: ${w};` : ""}
      ${h ? `height: ${h};` : ""}
    `;
  }}

  position: relative;
  display: inline-block;
  ${(p) => p.$rounded && "border-radius: 9.636px; overflow: hidden;"}
  ${(p) => p.$roundedCircle && "border-radius: 50%; overflow: hidden;"}
  ${(p) =>
    p.$thumbnail &&
    "background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 0.25rem;"}
  ${(p) => p.$fluid && "width: 100%;"}

  background: #000;
`;
