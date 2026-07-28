import React, { HtmlHTMLAttributes } from "react";
import { StyledTable, StyledTableWrapper } from "./table.style";

const Table: React.FC<HtmlHTMLAttributes<HTMLTableElement>> = ({
  children,
  ...htmlProps
}) => {
  return (
    <StyledTableWrapper>
      <StyledTable {...htmlProps}>{children}</StyledTable>
    </StyledTableWrapper>
  );
};

export default Table;
