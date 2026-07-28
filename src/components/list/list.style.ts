import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;
`;

export const StyledList = styled.div<{
  $maxHeight?: number | string;
  $dividers?: boolean;
}>`
  display: flex;

  flex-direction: column;

  width: 100%;

  overflow-y: ${({ $maxHeight }) => ($maxHeight ? "auto" : "visible")};

  max-height: ${({ $maxHeight }) =>
    typeof $maxHeight === "number" ? `${$maxHeight}px` : $maxHeight};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.bn.bn25};

    border-radius: 999px;
  }
`;

export const StyledListTitle = styled.span`
  font-size: ${({ theme }) => theme.fonts.h2500.fontSize};
  font-family: ${({ theme }) => theme.fonts.h2500.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h2500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h2500.lineHeight};
`;
