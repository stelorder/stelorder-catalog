import styled, { css } from "styled-components";
import {
  ItemAlign,
  SimpleGridItemBasicProps,
  SimpleGridItemProps,
  Spacing,
} from "./simple-grid-item";
import { StyledProp } from "../../styles/theme";
import React from "react";

const mapItemAlign = (align: ItemAlign) => {
  switch (align) {
    case "start":
      return "flex-start";
    case "center":
      return "center";
    case "end":
      return "flex-end";
    case "stretch":
      return "stretch";
    default:
      return "flex-start";
  }
};

const getFlexValue = (col: number | "auto", total: number, gap: number) => {
  if (col === "auto") return "auto";

  const ratio = Math.min(col / total, 1);
  const mitadGap = ((total - 1) * gap) / total;
  return `calc(${ratio * 100}% - ${mitadGap}px)`;
};

type StyleSimpleGridItemProps = {
  total: number;
  gap: number;
  col: number | "auto";
  ref: React.RefObject<HTMLDivElement | null>;
} & SimpleGridItemProps;

const responsiveSpacing = (spacing: Spacing, type: "margin" | "padding") =>
  spacing &&
  css`
    ${spacing.t && `${type}-top: ${spacing.t};`}
    ${spacing.b && `${type}-bottom: ${spacing.b};`}
    ${spacing.s && `${type}-left: ${spacing.s};`}
    ${spacing.e && `${type}-right: ${spacing.e};`}
  `;

const responsiveStyles = (
  bp: SimpleGridItemBasicProps | undefined,
  minWidth: string,
  total: number,
  gap: number,
) =>
  bp &&
  css`
    @media (min-width: ${minWidth}) {
      ${
        bp.col &&
        css`
          flex: 0 0 ${getFlexValue(bp.col, total, gap)};
        `
      }
      ${
        bp.align &&
        css`
          align-self: ${mapItemAlign(bp.align)};
        `
      }
      ${bp.m && responsiveSpacing(bp.m, "margin")}
      ${bp.p && responsiveSpacing(bp.p, "padding")}
    }
  `;

export const StyledSimpleGridItem = styled.div.attrs<
  StyledProp<StyleSimpleGridItemProps>
>(({ $styled, id }) => {
  const flexValue = getFlexValue($styled.col, $styled.total, $styled.gap);
  const height = $styled.ref?.current?.clientHeight;

  return {
    style: {
      ...(id && { [`--${id}-width`]: flexValue }),
      ...(id && height && { [`--${id}-height`]: `${height}px` }),
    } as React.CSSProperties,
  };
})<StyledProp<StyleSimpleGridItemProps>>`
  ${({ $styled }) =>
    $styled.align && `align-self: ${mapItemAlign($styled.align)};`}
  flex: 0 0 ${({ $styled }) =>
    getFlexValue($styled.col, $styled.total, $styled.gap)};

  ${({ $styled }) => $styled.m && responsiveSpacing($styled.m, "margin")}
  ${({ $styled }) => $styled.p && responsiveSpacing($styled.p, "padding")}
  ${({ $styled, theme }) => css`
    ${
      $styled.sm &&
      responsiveStyles(
        $styled.sm,
        theme.breakpoints.sm,
        $styled.total,
        $styled.gap,
      )
    }
    ${
      $styled.md &&
      responsiveStyles(
        $styled.md,
        theme.breakpoints.md,
        $styled.total,
        $styled.gap,
      )
    }
    ${
      $styled.lg &&
      responsiveStyles(
        $styled.lg,
        theme.breakpoints.lg,
        $styled.total,
        $styled.gap,
      )
    }
    ${
      $styled.xl &&
      responsiveStyles(
        $styled.xl,
        theme.breakpoints.xl,
        $styled.total,
        $styled.gap,
      )
    }
  `};
`;
