import styled from "styled-components";

export const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};
`;
