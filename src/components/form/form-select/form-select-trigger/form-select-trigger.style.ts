import styled from "styled-components";

export const StyledTrigger = styled.div<{ $selected?: boolean }>`
  flex: 1 0 auto;
  align-content: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: ${({ theme, $selected }) =>
    $selected
      ? theme.colors.orderSecondary.orderSecondary90
      : theme.colors.orderSecondary.orderSecondary70};
  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
`;

export const StyledChevron = styled.span`
  width: 10px;
  height: 14px;
  flex: 0 0 auto;
  color: ${({ theme }) => theme.colors.bn.bn60};
  display: flex;
  align-items: center;
`;
