import styled, { keyframes } from "styled-components";
import { StyledProp } from "../styles/theme";

const STAGGER_SPAN = 30;
const FALL_ANCHOR = 50;
const FADE_DURATION = 30;

const getDotKeyframes = (index: number, count: number) => {
  const stagger = STAGGER_SPAN / count;
  const riseStart = index * stagger;
  const riseEnd = riseStart + FADE_DURATION;
  const fallStart = FALL_ANCHOR + index * stagger;
  const fallEnd = fallStart + FADE_DURATION;

  return keyframes`
    ${`0%, ${riseStart}%, ${fallEnd}%, 100%`} {
      opacity: 0;
    }
    ${`${riseEnd}%, ${fallStart}%`} {
      opacity: 1;
    }
  `;
};

export const StyleContainer = styled.div<StyledProp<{ gap: number }>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $styled }) => $styled.gap}px;
`;

export const StyleDot = styled.div<
  StyledProp<{
    color?: string;
    size: number;
    speed: number;
    index: number;
    count: number;
  }>
>`
  width: ${({ $styled }) => $styled.size}px;
  height: ${({ $styled }) => $styled.size}px;
  border-radius: 50%;
  background-color: ${({ $styled, theme }) =>
    $styled.color ?? theme.colors.orderSecondary.orderSecondary40};
  animation: ${({ $styled }) => getDotKeyframes($styled.index, $styled.count)}
    ${({ $styled }) => $styled.speed}s ease-in-out infinite;
`;
