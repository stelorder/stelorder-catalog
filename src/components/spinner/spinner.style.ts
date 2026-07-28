import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const dash = keyframes`
  0%   { stroke-dashoffset: 75%; }
  50%  { stroke-dashoffset: 25%; }
  100% { stroke-dashoffset: 75%; }
`;

export const StyledSpinner = styled.svg`
  display: inline-block;
  vertical-align: middle;
  animation: ${spin} 1s linear infinite;

  circle:last-child {
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;
