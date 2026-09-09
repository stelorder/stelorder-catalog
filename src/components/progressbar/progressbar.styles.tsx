import React from "react";
import styled from "styled-components";
import { StyledProp } from "../styles/theme";
import { ProgressBarProps } from "./progressbar";

type StyledProgressBarProps = StyledProp<ProgressBarProps>;

const ProgressBarContainer = styled.div<
  StyledProp<{
    width?: string | number;
    trackColor?: string;
    borderColor?: string;
  }>
>`
  width: ${({ $styled }) =>
    $styled.width
      ? typeof $styled.width === "number"
        ? `${$styled.width}px`
        : $styled.width
      : "100%"};
  background-color: ${({ $styled, theme }) =>
    $styled.trackColor || theme.colors.bn.bn25};
  border-radius: 4px;
  overflow: hidden;
  ${({ $styled }) =>
    $styled.borderColor
      ? `box-shadow: inset 0 0 0 1px ${$styled.borderColor};`
      : ""}
`;

const ProgressBarFill = styled.div<
  StyledProp<{ now: number; color?: string; height?: string | number }>
>`
  width: ${({ $styled }) => Math.min(Math.max($styled.now, 0), 100)}%;
  height: ${({ $styled }) =>
    $styled.height
      ? typeof $styled.height === "number"
        ? `${$styled.height}px`
        : $styled.height
      : "20px"};
  background-color: ${({ $styled, theme }) =>
    $styled.color || theme.colors.blue.blue100};
  border-radius: 4px;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressLabel = styled.span`
  color: ${({ theme }) => theme.colors.bn.bn100};
  font-family: ${({ theme }) => theme.fonts.h2500.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h2500.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h2500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h2500.lineHeight};
  white-space: nowrap;
`;

export const StyledProgressBar: React.FC<
  StyledProgressBarProps & React.HTMLAttributes<HTMLDivElement>
> = ({ $styled, ...htmlProps }) => {
  const clampedNow = Math.min(Math.max($styled.now, 0), 100);
  return (
    <ProgressBarContainer
      $styled={{
        width: $styled.width,
        trackColor: $styled.trackColor,
        borderColor: $styled.borderColor,
      }}
      role="progressbar"
      aria-valuenow={clampedNow}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={$styled.ariaLabel || "Progress"}
      {...htmlProps}
    >
      <ProgressBarFill
        $styled={{
          now: $styled.now,
          color: $styled.color,
          height: $styled.height,
        }}
      >
        {$styled.label && <ProgressLabel>{clampedNow}%</ProgressLabel>}
      </ProgressBarFill>
    </ProgressBarContainer>
  );
};
