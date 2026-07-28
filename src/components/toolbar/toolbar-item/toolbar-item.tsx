import { type PropsWithChildren } from "react";
import { HtmlProps } from "../../styles/theme";

export type ToolbarItemPosition = "start" | "center" | "end";

export type ToolbarItemProps = PropsWithChildren<
  HtmlProps<HTMLDivElement> & {
    position?: ToolbarItemPosition;
    columns?: number | "auto";
    expand?: boolean;
  }
>;

const ToolbarItem = ({ children }: ToolbarItemProps) => <>{children}</>;

ToolbarItem.displayName = "Toolbar.Item";

export default ToolbarItem;
