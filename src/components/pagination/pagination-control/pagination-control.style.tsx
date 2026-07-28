import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { StyledProp } from "../../styles/theme";

export const StyledNormalControl = styled.button.attrs({ type: "button" })`
  all: unset;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.h2400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h2400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h2400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h2400.lineHeight};
  font-style: ${({ theme }) => theme.fonts.h2400.fontStyle};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};

  &:hover {
    color: ${({ theme }) => theme.colors.orderPrimary.orderPrimary100};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  }
`;

export const StyledCurrentPageControl = styled.span`
  font-family: ${({ theme }) => theme.fonts.h2400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h2400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h2400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h2400.lineHeight};
  font-style: ${({ theme }) => theme.fonts.h2400.fontStyle};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
`;

const StyledNextArrowControl = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  role: "button",
})`
  width: 20px;
  height: 12px;
  margin-top: 4px;
  display: inline-block;
  cursor: pointer;

  & path {
    stroke: ${({ theme }) => theme.colors.orderPrimary.orderPrimary100};
  }

  &.disabled path {
    stroke: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  }

  &.disabled {
    cursor: not-allowed;
  }
`;

export const StyledArrowControl: React.FC<
  StyledProp<{ type: "prev" | "next" }> & HTMLAttributes<SVGElement>
> = ({ $styled, ...props }) => (
  <StyledNextArrowControl {...props}>
    {$styled.type === "next" ? (
      <path
        d="M8 4L16 12L8 20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M16 4L8 12L16 20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </StyledNextArrowControl>
);
