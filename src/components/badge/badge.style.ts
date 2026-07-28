import styled from "styled-components";
import { StyledProp } from "../styles/theme";

export const StyledBadge = styled.div<
  StyledProp<{
    variant?: string;
  }>
>`
  display: flex;
  min-width: 70px;
  padding: var(--tiny-2, 2px) var(--xs-12, 12px);
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--4xs-6, 6px);

  height: inherit;

  #Texto
  overflow: hidden;
  
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  text-align: center;
  font-feature-settings: 'liga' off;
  text-overflow: ellipsis;

  font-family: ${({ theme }) => theme.defaults.badgeText.fontFamily};
  font-size: ${({ theme }) => theme.defaults.badgeText.fontSize};
  font-style: ${({ theme }) => theme.defaults.badgeText.fontStyle};
  font-weight: ${({ theme }) => theme.defaults.badgeText.fontWeight};
  line-height: ${({ theme }) => theme.defaults.badgeText.lineHeight};

  background: ${({ $styled, theme }) => {
    switch ($styled.variant) {
      case "success":
        return theme.colors.status.success;
      case "warning":
        return theme.colors.status.warning;
      case "error":
        return theme.colors.status.danger;
      case "highlight":
        return `linear-gradient(137deg, ${theme.colors.highlighted.highlighted3} -9.84%, ${theme.colors.highlighted.highlighted4} 115.27%)`;
      case "info":
      default:
        return theme.colors.status.success;
    }
  }};
`;
