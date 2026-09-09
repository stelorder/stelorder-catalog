import { StyleContainer, StyleDot } from "./loadingDots.style";

export interface LoadingDotsProps {
  count?: number;
  color?: string;
  speed?: number;
  size?: number;
  gap?: number;
}

const LoadingDots = ({
  count = 3,
  color,
  speed = 1,
  size = 8,
  gap = 3,
}: LoadingDotsProps) => (
  <StyleContainer $styled={{ gap }}>
    {Array.from({ length: count }).map((_, i) => (
      <StyleDot key={i} $styled={{ color, size, speed, index: i, count }} />
    ))}
  </StyleContainer>
);

LoadingDots.displayName = "LoadingDots";
export default LoadingDots;
