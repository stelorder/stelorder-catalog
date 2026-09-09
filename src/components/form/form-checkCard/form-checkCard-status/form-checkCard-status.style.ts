import styled from "styled-components";

export const StyledFormCheckCardStatus = styled.span`
  display: none;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 12px;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.blue.blue5};
  border: 1px solid ${({ theme }) => theme.colors.blue.blue30};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.blue.blue100};
  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
`;
