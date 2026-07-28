import React, { type PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledToolbar } from "./toolbar.style";
import SimpleGrid from "../simple-grid/simple-grid";
import ToolbarItem, {
  type ToolbarItemPosition,
  type ToolbarItemProps,
} from "./toolbar-item/toolbar-item";

export type ToolbarProps = PropsWithChildren<
  HtmlProps<HTMLDivElement> & {
    height?: string;
    width?: string;
    backgroundColor?: string;
  }
>;

type ToolbarComponent = React.FC<ToolbarProps> & {
  Item: React.FC<ToolbarItemProps>;
};

const getJustifyContent = (position?: ToolbarItemPosition) => {
  if (position === "center") return "center";
  if (position === "end") return "flex-end";
  return "flex-start";
};

const Toolbar = ({
  htmlProps,
  height,
  width,
  backgroundColor,
  children,
}: ToolbarProps) => {
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<ToolbarItemProps> =>
      React.isValidElement<ToolbarItemProps>(child) &&
      child.type === ToolbarItem,
  );

  return (
    <StyledToolbar
      {...htmlProps}
      $height={height}
      $width={width}
      $backgroundColor={backgroundColor}
    >
      <SimpleGrid
        itemsPerLine={12}
        gap={2}
        alignY="center"
        alignX="between"
        fullWidth
        htmlProps={{ as: "div", style: { height: "100%" } }}
      >
        {items.map((child, index) => {
          const {
            children: itemChildren,
            columns,
            expand,
            position,
            htmlProps: itemHtmlProps,
          } = child.props;

          return (
            <SimpleGrid.Item
              key={child.key ?? index}
              col={columns ?? "auto"}
              htmlProps={{
                ...itemHtmlProps,
                style: {
                  ...(expand ? { flex: 1 } : {}),
                  alignItems: "center",
                  justifyContent: getJustifyContent(position),
                  display: "flex",
                  ...itemHtmlProps?.style,
                },
              }}
            >
              {itemChildren}
            </SimpleGrid.Item>
          );
        })}
      </SimpleGrid>
    </StyledToolbar>
  );
};

const toolbarComponent = Toolbar as ToolbarComponent;
toolbarComponent.Item = ToolbarItem;

export default toolbarComponent;
