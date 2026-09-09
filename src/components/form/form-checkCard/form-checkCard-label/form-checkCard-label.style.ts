import styled from "styled-components";

export const StyledFormCheckCardLabel = styled.span`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};
  word-wrap: break-word;
`;
