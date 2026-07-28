import styled, { keyframes } from "styled-components";

const shadowPulse = keyframes`
  33% {
    background: #FFF;
    box-shadow: -36px 0 #FD6C00, 36px 0 #FFF;
  }
  66% {
    background: #FD6C00;
    box-shadow: -36px 0 #FFF, 36px 0 #FFF;
  }
  100% {
    background: #FFF;
    box-shadow: -36px 0 #FFF, 36px 0 #FD6C00;
  }
`;

export const StyledLoader = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: #fff;
  box-shadow:
    -36px 0 #fff,
    36px 0 #fff;
  animation: ${shadowPulse} 1s linear infinite;
  margin-bottom: 24px;
`;
