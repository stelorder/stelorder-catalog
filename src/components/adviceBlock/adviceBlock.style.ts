import styled from "styled-components";
import { StyledProp } from "../styles/theme";

export const StyledAdviceBlock = styled.div<
  StyledProp<{
    variant?: string;
  }>
>`
  display: flex;

  padding: var(--3xs-8, 8px);
  justify-content: center;
  align-items: flex-start;
  gap: 4px;

  border-radius: var(--5xs-4, 4px);

  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  font-feature-settings: "liga" off;
  font-family: ${({ theme }) => theme.fonts.h2400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h2400.fontSize};
  font-style: ${({ theme }) => theme.fonts.h2400.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.h2400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h2400.lineHeight};

  background: ${({ $styled, theme }) => {
    switch ($styled.variant) {
      default:
        return theme.colors.blue.blue5;
    }
  }};
`;
