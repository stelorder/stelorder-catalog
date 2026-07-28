import styled from "styled-components";

export const StyledDocumentCardInfoBodyBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
  font-feature-settings: "liga" off;

  font-family: ${({ theme }) => theme.defaults.documentCardInfoBody.fontFamily};
  font-size: ${({ theme }) => theme.defaults.documentCardInfoBody.fontSize};
  font-style: ${({ theme }) => theme.defaults.documentCardInfoBody.fontStyle};
  font-weight: ${({ theme }) => theme.defaults.documentCardInfoBody.fontWeight};
  line-height: ${({ theme }) => theme.defaults.documentCardInfoBody.lineHeight};
`;
