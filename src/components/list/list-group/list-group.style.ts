import styled from "styled-components";

export const StyledGroup = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;
  padding: 12px 0 8px;
`;

export const StyledGroupTitle = styled.div`
  font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
  font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};

  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
`;
