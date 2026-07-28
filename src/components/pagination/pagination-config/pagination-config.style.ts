import styled from "styled-components";

export const StyledPaginationConfigInfo = styled.span`
  font-size: ${({ theme }) => theme.fonts.h2400.fontSize};
  font-family: ${({ theme }) => theme.fonts.h2400.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h2400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h2400.lineHeight};
  font-style: ${({ theme }) => theme.fonts.h2400.fontStyle};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
`;

export const StyledPaginationConfigPerPage = styled.span`
  font-size: ${({ theme }) => theme.fonts.h2400.fontSize};
  font-family: ${({ theme }) => theme.fonts.h2400.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.h2400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h2400.lineHeight};
  font-style: ${({ theme }) => theme.fonts.h2400.fontStyle};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
`;

export const StyledPaginationConfigSelectScope = styled.div`
  && .form-control.select {
    min-height: 22px;
    height: 22px;
    gap: 0;
    padding: 3px 6px;
  }

  && .form-control.select span:has(svg) {
    display: none;
  }

  && .form-control.select > div {
    display: flex;
    align-items: center;
  }

  && .form-control.select ul li {
    padding: 0px;
  }

  && .form-control.select ul {
    width: max-content;
  }
`;
