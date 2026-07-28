import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import Pagination, { PaginationProps } from "../pagination/pagination";
import { Table } from "../table";
import { SimpleGrid } from "../simple-grid";

const PaginatedTable: React.FC<
  PropsWithChildren<PaginationProps & HtmlProps<HTMLDivElement>>
> = ({ children, htmlProps, ...paginationProps }) => {
  return (
    <SimpleGrid htmlProps={htmlProps} direction="column" gap={10}>
      <SimpleGrid.Item
        htmlProps={{
          style: { width: "100%" },
        }}
      >
        <Table>{children}</Table>
      </SimpleGrid.Item>
      <SimpleGrid.Item>
        <Pagination {...paginationProps} />
      </SimpleGrid.Item>
    </SimpleGrid>
  );
};

export default PaginatedTable;
