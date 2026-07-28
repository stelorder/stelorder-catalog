import styled, { css } from "styled-components";

export const StyledListItem = styled.div<{
  $hasDivider?: boolean;
  $selected?: boolean;
  $disabled?: boolean;
  $clickable?: boolean;
}>`
  padding: 12px 0;

  border-bottom: ${({ $hasDivider, theme }) =>
    $hasDivider
      ? `1px solid ${theme.colors.orderSecondary.orderSecondary20}`
      : "none"};

  ${({ $clickable, theme }) =>
    $clickable &&
    css`
      cursor: pointer;

      &:hover {
        background: ${theme.colors.bn.bn5};

        ${StyledLabel}, ${StyledDescription},  ${StyledEndContent} {
          color: ${theme.colors.orderSecondary.orderSecondary100};
        }
      }
    `}
  ${({ $selected, theme }) =>
    $selected &&
    css`
      background: ${theme.colors.bn.bn10};
    `}
`;

export const StyledItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const StyledMainContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const StyledTextContent = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
`;

export const StyledLabel = styled.span`
  font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
  font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};

  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
`;

export const StyledDescription = styled.span`
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
`;

export const StyledEndContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
`;

export const StyledChildren = styled.div`
  padding-left: 20px;
`;
