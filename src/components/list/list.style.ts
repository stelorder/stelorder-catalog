import styled from "styled-components";

const PADDING_OFFSETS = [0, 18, 24, 22];

export const StyledContainer = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;
`;

export const StyledList = styled.div<{
  $maxHeight?: number | string;
  $dividers?: boolean;
  $level?: number;
  $paddingBase?: number;
}>`
  display: flex;

  flex-direction: column;

  width: 100%;

  overflow-y: ${({ $maxHeight }) => ($maxHeight ? "auto" : "visible")};

  max-height: ${({ $maxHeight }) =>
    typeof $maxHeight === "number" ? `${$maxHeight}px` : $maxHeight};

  padding-left: ${({ $level = 0, $paddingBase = 0 }) => {
    const idx = Math.min($level, PADDING_OFFSETS.length - 1);
    return `${$paddingBase + PADDING_OFFSETS[idx]}px`;
  }};

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
