import styled from "styled-components";
import { StyledProp } from "../styles/theme";
import type { StrokeLinecap, StrokeLinejoin } from "./icon-constants";

export type SizePx = string;

const format = (v?: SizePx | number) =>
  v === undefined ? undefined : typeof v === "number" ? `${v}px` : v;

export const StyledIcon = styled.svg<
  StyledProp<{
    width?: SizePx;
    height?: SizePx;
    color?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: StrokeLinecap;
    strokeLinejoin?: StrokeLinejoin;
  }>
>`
  ${({ $styled }) => {
    const w = format($styled.width);
    const h = format($styled.height);
    const color = $styled.color;
    return `
      ${w ? `width: ${w};` : ""}
      ${h ? `height: ${h};` : ""}
      ${!color ? "" : color !== "inherit" ? `color: ${color};` : ""}
    `;
  }}

  display: inline-block;
  vertical-align: middle;
  background: transparent;

  ${({ $styled }) =>
    $styled.color && $styled.color !== "inherit"
      ? `
        path {
          fill: currentColor !important;
        }
      `
      : ""}

  ${({ $styled }) => {
    const strokeWidth = format($styled.strokeWidth);

    if (
      !$styled.stroke &&
      !strokeWidth &&
      !$styled.strokeLinecap &&
      !$styled.strokeLinejoin
    ) {
      return "";
    }

    return `
      * {
        ${$styled.stroke ? `stroke: ${$styled.stroke} !important;` : ""}
        ${strokeWidth ? `stroke-width: ${strokeWidth} !important;` : ""}
        ${$styled.strokeLinecap ? `stroke-linecap: ${$styled.strokeLinecap} !important;` : ""}
        ${$styled.strokeLinejoin ? `stroke-linejoin: ${$styled.strokeLinejoin} !important;` : ""}
      }
    `;
  }}
`;
