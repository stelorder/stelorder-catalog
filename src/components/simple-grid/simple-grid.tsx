import React, { ReactElement, useMemo } from "react";
import { StyledSimpleGrid } from "./simple-grid.style";
import SimpleGridItem, {
  SimpleGridItemProps,
} from "./simple-grid-item/simple-grid-item";
import { SimpleGridContext } from "./context/simple-grid-context";
import { useTheme } from "styled-components";
import { breakpointsType, HtmlProps } from "../styles/theme";

export type GridDirection = "row" | "column";
export type GridAlign =
  | "start"
  | "center"
  | "end"
  | "stretch"
  | "between"
  | "around";

type SimpleGridResponsiveProps = {
  [key in breakpointsType]?: SimpleGridBasicProps;
};

export type SimpleGridBasicProps = {
  direction?: GridDirection;
  wrap?: boolean;
  alignX?: GridAlign;
  alignY?: GridAlign;
  gap?: number;
};

export type SimpleGridProps = {
  fullWidth?: boolean;
  itemsPerLine?: number;
} & SimpleGridBasicProps &
  SimpleGridResponsiveProps;

const SimpleGrid: React.FC<
  SimpleGridProps & {
    children:
      | ReactElement<SimpleGridItemProps>
      | ReactElement<SimpleGridItemProps>[];
  } & HtmlProps<HTMLDivElement>
> = ({
  wrap,
  fullWidth,
  direction,
  itemsPerLine,
  alignX,
  alignY,
  gap,
  children,
  htmlProps,
  ...props
}) => {
  const theme = useTheme();
  const gridContext = useMemo(
    () => ({
      wrap: wrap ?? theme.defaults.grid.wrap,
      fullWidth: fullWidth ?? theme.defaults.grid.fullWidth,
      direction: (direction ?? theme.defaults.grid.direction) as GridDirection,
      itemsPerLine: itemsPerLine ?? theme.defaults.grid.itemsPerLine,
      alignX,
      alignY,
      gap: gap ?? theme.defaults.grid.gap,
      ...props,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fullWidth, direction, itemsPerLine, alignX, alignY, gap],
  );
  return (
    <SimpleGridContext.Provider value={gridContext as SimpleGridProps}>
      <StyledSimpleGrid $styled={gridContext} {...htmlProps}>
        {children}
      </StyledSimpleGrid>
    </SimpleGridContext.Provider>
  );
};

export type SimpleGridComponent = typeof SimpleGrid & {
  Item: typeof SimpleGridItem;
};

const simpleGridComponent = SimpleGrid as SimpleGridComponent;
simpleGridComponent.Item = SimpleGridItem;

export default simpleGridComponent;
