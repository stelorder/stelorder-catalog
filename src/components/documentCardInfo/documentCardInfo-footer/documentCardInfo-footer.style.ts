import styled from "styled-components";

export const StyledDocumentCardInfoFooter = styled.samp`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;

  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  font-feature-settings: "liga" off;

  font-family: ${({ theme }) =>
    theme.defaults.documentCardInfoFooter.fontFamily};
  font-size: ${({ theme }) => theme.defaults.documentCardInfoFooter.fontSize};
  font-style: ${({ theme }) => theme.defaults.documentCardInfoFooter.fontStyle};
  font-weight: ${({ theme }) =>
    theme.defaults.documentCardInfoFooter.fontWeight};
  line-height: ${({ theme }) =>
    theme.defaults.documentCardInfoFooter.lineHeight};
`;
