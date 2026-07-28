import styled from "styled-components";

export const StyledCardText = styled.p`
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
  text-align: inherit;
  font-feature-settings: "liga" off;
  font-family: ${({ theme }) => theme.defaults.cardText.fontFamily};
  font-size: ${({ theme }) => theme.defaults.cardText.fontSize};
  font-style: ${({ theme }) => theme.defaults.cardText.fontStyle};
  font-weight: ${({ theme }) => theme.defaults.cardText.fontWeight};
  line-height: ${({ theme }) => theme.defaults.cardText.lineHeight};
  margin: 0;
`;
