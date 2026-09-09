import styled from "styled-components";
import { StyledProp } from "../styles/theme";
import type { SizePx } from "../icon/icon.style";

export const StyledAvatar = styled.div<
  StyledProp<{
    size: SizePx;
    color?: string;
  }>
>`
  width: ${({ $styled }) => $styled.size};
  height: ${({ $styled }) => $styled.size};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ $styled, theme }) =>
    $styled.color ?? theme.colors.orderPrimary.orderPrimary90};
`;
