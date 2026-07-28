import styled from "styled-components";

export const StyledSelectCardTitle = styled.h1`
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  font-feature-settings: "liga" off;

  font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
  font-style: ${({ theme }) => theme.fonts.h1500.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};
  margin: 0;
`;
