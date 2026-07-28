import styled from "styled-components";

export const StyledDocumentCardInfoBodyHeader = styled.div`
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  font-feature-settings: "liga" off;

  font-family: ${({ theme }) =>
    theme.defaults.documentCardInfoTitle.fontFamily};
  font-size: ${({ theme }) => theme.defaults.documentCardInfoTitle.fontSize};
  font-style: ${({ theme }) => theme.defaults.documentCardInfoTitle.fontStyle};
  font-weight: ${({ theme }) =>
    theme.defaults.documentCardInfoTitle.fontWeight};
  line-height: ${({ theme }) =>
    theme.defaults.documentCardInfoTitle.lineHeight};
`;
