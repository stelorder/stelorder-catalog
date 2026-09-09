import styled from "styled-components";

export const StyledFormCheckCardDescription = styled.span`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
  word-wrap: break-word;
`;
