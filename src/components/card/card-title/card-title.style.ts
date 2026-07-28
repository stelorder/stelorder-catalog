import styled from "styled-components";

export const StyledCardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  text-align: inherit;
  font-feature-settings: "liga" off;
  font-family: ${({ theme }) => theme.defaults.cardTitle.fontFamily};
  font-size: ${({ theme }) => theme.defaults.cardTitle.fontSize};
  font-style: ${({ theme }) => theme.defaults.cardTitle.fontStyle};
  font-weight: ${({ theme }) => theme.defaults.cardTitle.fontWeight};
  line-height: ${({ theme }) => theme.defaults.cardTitle.lineHeight};
  margin: 0;
`;
