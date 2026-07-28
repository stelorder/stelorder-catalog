import styled from "styled-components";
import { SearchInputSize } from "./search-input";
import { StyledProp } from "../styles/theme";

const sizes: Record<
  SearchInputSize,
  { w: string; h: string; p: string; gap: string }
> = {
  l: { w: "245px", h: "20px", p: "3px 8px 3px 10px", gap: "10px" },
  xl: { w: "820px", h: "20px", p: "3px 8px 3px 10px", gap: "10px" },
  m: { w: "108px", h: "20px", p: "3px 8px 3px 10px", gap: "10px" },
};

export const StyledSearchInput = styled.input<
  StyledProp<{
    size: SearchInputSize;
  }>
>`
  border-radius: 8px;
  padding: ${({ $styled }) => sizes[$styled.size].p};
  font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
  font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};
  width: ${({ $styled }) => sizes[$styled.size].w};
  height: ${({ $styled }) => sizes[$styled.size].h};
  outline: none;
  border: none;
  background-color: ${({ theme }) =>
    theme.colors.orderSecondary.orderSecondary5};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};

  &::placeholder {
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
    fonts: ${({ theme }) => theme.fonts.h1400};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
