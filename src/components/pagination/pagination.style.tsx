import React, { useId } from "react";
import { SimpleGrid } from "../simple-grid";

export const StyledPaginationContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, ...htmlProps }) => {
  const arrayChildren = React.Children.toArray(children);
  const id = useId();
  return (
    <SimpleGrid
      htmlProps={{ ...htmlProps }}
      itemsPerLine={arrayChildren.length}
      alignX="between"
    >
      {arrayChildren.map((child, index) => (
        <SimpleGrid.Item key={`${id}-pagination-item-${index}`} col="auto">
          {child}
        </SimpleGrid.Item>
      ))}
    </SimpleGrid>
  );
};
