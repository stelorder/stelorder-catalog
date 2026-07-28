import styled from "styled-components";
import { StyledTable } from "../table/table.style";

export const StyledSearchableTable = styled(StyledTable)`
  & thead tr th:not([data-action-column="true"]) {
    padding: 10px 0 10px 6px;
  }

  & thead tr th:not([data-action-column="true"]) > div {
    display: grid;
    grid-template-rows: auto minmax(20px, auto);
    padding-right: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    flex: 1 0 0;
    position: relative;
  }

  & thead tr th:not([data-action-column="true"]) > div > span:first-child {
    display: flex;
    padding-left: 10px;
    padding-right: 4px;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
  }

  & thead tr th::after {
    display: none;
  }

  & thead tr th[data-action-column="true"] {
    resize: none !important;
    cursor: default !important;
    overflow: hidden !important;
  }

  & thead tr th[data-action-column="true"]::before,
  & thead tr th[data-action-column="true"]::after {
    display: none !important;
    content: none !important;
  }

  & thead tr th:not(:last-child):not([data-action-column="true"]) > div::after {
    content: "";
    width: 1px;
    position: absolute;
    height: 100%;
    right: 0;
    border-left: 0.5px dotted
      ${(props) => props.theme.colors.orderSecondary.orderSecondary50};
  }
`;
