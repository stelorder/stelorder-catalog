import styled from "styled-components";

export const StyledScrollList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  scrollbar-color: ${({ theme }) => theme.colors.bn.bn25} transparent;
  gap: 4px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.orderPrimary.orderPrimary100};
    outline-offset: 2px;
  }
`;

export const StyledScrollListTitle = styled.span`
  font-size: ${({ theme }) => theme.fonts.h2500.fontSize};
  font-family: ${({ theme }) => theme.fonts.h2500.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h2500.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h2500.lineHeight};
`;
