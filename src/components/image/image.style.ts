import styled from "styled-components";

import type { SizePx } from "../icon/icon.style";

const format = (v?: SizePx) => (v === undefined ? undefined : v);

export const StyledIcon = styled.svg<{
  width?: SizePx;
  height?: SizePx;
  color?: string;
}>`
  ${(props) => {
    const w = format(props.width);
    const h = format(props.height);
    return `
      ${w ? `width: ${w};` : ""}
      ${h ? `height: ${h};` : ""}
    `;
  }}

  display: inline-block;
  vertical-align: middle;

  color: ${({ color }) => color ?? "var(--Order-Primary-90, #FD893A)"};
  path {
    fill: currentColor !important;
  }
`;

/* Image styled using transient props ($...) to avoid forwarding to DOM */
export const StyledImage = styled.img<{
  $fluid?: boolean;
  $rounded?: boolean;
  $roundedCircle?: boolean;
  $thumbnail?: boolean;
  $width?: SizePx;
  $height?: SizePx;
}>`
  ${(p) => {
    const w = format(p.$width);
    const h = format(p.$height);
    return `
      ${w ? `width: ${w};` : ""}
      ${h ? `height: ${h};` : ""}
    `;
  }}

  ${(props) =>
    props.$fluid &&
    `
    max-width: 100%;
    height: auto;
  `}

  ${(props) =>
    props.$rounded &&
    `
    border-radius: 0.25rem;
  `}

  ${(props) =>
    props.$roundedCircle &&
    `
    border-radius: 50%;
  `}

  ${(props) =>
    props.$thumbnail &&
    `
    display: block;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
  `}
`;
