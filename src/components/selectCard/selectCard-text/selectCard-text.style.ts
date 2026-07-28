import styled from "styled-components";
// TODO color review
export const StyledSelectCardText = styled.span`
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  font-feature-settings: "liga" off;

  font-family: ${({ theme }) => theme.fonts.h2400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h2400.fontSize};
  font-style: ${({ theme }) => theme.fonts.h2400.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.h2400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h2400.lineHeight};
`;
