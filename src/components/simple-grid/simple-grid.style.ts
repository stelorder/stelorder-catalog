import styled, { css } from "styled-components";
import {
  GridAlign,
  SimpleGridBasicProps,
  SimpleGridProps,
} from "./simple-grid";
import { StyledProp } from "../styles/theme";

const mapAlign = (align: GridAlign) => {
  switch (align) {
    case "start":
      return "flex-start";
    case "center":
      return "center";
    case "end":
      return "flex-end";
    case "stretch":
      return "stretch";
    case "between":
      return "space-between";
    case "around":
      return "space-around";
    default:
      return "flex-start";
  }
};

type StyledSimpleGridProps = SimpleGridProps & {
  itemsPerLine: number;
  alignX?: GridAlign;
  alignY?: GridAlign;
};

const responsiveStyles = (
  bp: SimpleGridBasicProps | undefined,
  minWidth: string,
) =>
  bp &&
  css`
    @media (min-width: ${minWidth}) {
      ${bp.direction &&
      css`
        flex-direction: ${bp.direction};
      `}
      ${bp.alignY &&
      css`
        align-items: ${mapAlign(bp.alignY)};
      `}
    ${bp.gap &&
      css`
        gap: ${bp.gap}px;
      `}
    ${bp.alignX &&
      css`
        justify-content: ${mapAlign(bp.alignX)};
      `}
    ${bp.alignY &&
      css`
        align-items: ${mapAlign(bp.alignY)};
      `}
    ${bp.wrap &&
      css`
        flex-wrap: ${bp.wrap ? "wrap" : "nowrap"};
      `}
    }
  `;

export const StyledSimpleGrid = styled.div<StyledProp<StyledSimpleGridProps>>`
  display: flex;
  flex-direction: ${({ $styled }) => $styled.direction};
  flex-wrap: ${({ $styled }) => ($styled.wrap ? "wrap" : "nowrap")};
  width: 100%;
  ${({ $styled, theme }) =>
    $styled.fullWidth ? "" : `max-width: ${theme.defaults.grid.maxWidth}`};
  ${({ $styled }) =>
    $styled.alignX &&
    css`
      justify-content: ${mapAlign($styled.alignX)};
    `}
  ${({ $styled }) =>
    $styled.alignY &&
    css`
      align-items: ${mapAlign($styled.alignY)};
    `}
  gap: ${({ $styled, theme }) => $styled.gap ?? theme.defaults.grid.gap}px;

  ${({ $styled, theme }) => css`
    ${responsiveStyles($styled.sm, theme.breakpoints.sm)}
    ${responsiveStyles($styled.md, theme.breakpoints.md)}
    ${responsiveStyles($styled.lg, theme.breakpoints.lg)}
    ${responsiveStyles($styled.xl, theme.breakpoints.xl)}
  `}
`;
