import styled from "styled-components";

export const StyledTableWrapper = styled.div`
  width: 100%;
  border: 1px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary10};
  border-radius: 12px;
  overflow: hidden; /* recorta esquinas y fondos internos */
  overflow-x: auto;
`;
export const StyledTable = styled.table`
  width: 100%;
  table-layout: auto;
  border-collapse: separate; /* permite radius */
  border-spacing: 0;
  border: 0;

  text-align: center;
  vertical-align: middle; /* 'center' no es válido */
  overflow: auto;

  /* Stripped */
  & tbody tr:nth-child(even) {
    background-color: ${(props) =>
      props.theme.colors.orderSecondary.orderSecondary5};
  }

  & tbody tr:nth-child(odd),
  & thead {
    background-color: ${(props) => props.theme.colors.bn.bn0};
  }

  & tbody tr td {
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis; /* opcional para truncar */
    white-space: nowrap; /* si quieres una sola línea */

    font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
    font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
    font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
    line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  }

  & thead tr th {
    padding: 10px 10px 10px 16px;
    text-align: left;
    border-bottom: 1px solid
      ${({ theme }) => theme.colors.orderSecondary.orderSecondary10};

    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
    font-family: ${({ theme }) => theme.fonts.h1500.fontFamily};
    font-size: ${({ theme }) => theme.fonts.h1500.fontSize};
    font-weight: ${({ theme }) => theme.fonts.h1500.fontWeight};
    line-height: ${({ theme }) => theme.fonts.h1500.lineHeight};
    position: relative;
    white-space: nowrap;
    resize: horizontal;
    overflow: auto;
  }

  & thead tr th:first-child {
    border-top-left-radius: 12px;
  }
  & thead tr th:last-child {
    border-top-right-radius: 12px;
  }
  & tbody tr:last-child td:first-child {
    border-bottom-left-radius: 12px;
  }
  & tbody tr:last-child td:last-child {
    border-bottom-right-radius: 12px;
  }

  & thead th:not(:last-child)::after {
    content: "";
    width: 1px;
    position: absolute;
    height: 50%;
    right: 0;
    border-left: 0.5px dotted
      ${(props) => props.theme.colors.orderSecondary.orderSecondary50};
  }
`;
